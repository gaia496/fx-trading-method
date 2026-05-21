import { NextRequest, NextResponse } from 'next/server';
import { listFiles, putFile } from '@/lib/github';
import matter from 'gray-matter';

export async function GET() {
  const files = await listFiles('content/articles');
  if (!Array.isArray(files)) return NextResponse.json([]);

  const articles = await Promise.all(
    files
      .filter((f: { name: string }) => f.name.endsWith('.md'))
      .map(async (f: { name: string; download_url: string }) => {
        const res = await fetch(f.download_url, { cache: 'no-store' });
        const raw = await res.text();
        const { data } = matter(raw);
        return { slug: f.name.replace('.md', ''), ...data };
      })
  );

  return NextResponse.json((articles as { date?: string }[]).sort((a, b) =>
    new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
  ));
}

export async function POST(req: NextRequest) {
  const { slug, frontmatter, content } = await req.json();
  const fm = matter.stringify(content, frontmatter);
  await putFile(`content/articles/${slug}.md`, fm, `Add article: ${frontmatter.title}`);
  return NextResponse.json({ ok: true });
}
