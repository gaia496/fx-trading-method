import { NextRequest, NextResponse } from 'next/server';
import { getFile, putFile, deleteFile } from '@/lib/github';
import matter from 'gray-matter';

interface Props { params: Promise<{ slug: string }> }

export async function GET(_req: NextRequest, { params }: Props) {
  const { slug } = await params;
  const file = await getFile(`content/articles/${slug}.md`);
  if (!file) return NextResponse.json(null, { status: 404 });
  const raw = Buffer.from(file.content, 'base64').toString('utf8');
  const { data, content } = matter(raw);
  return NextResponse.json({ slug, frontmatter: data, content, sha: file.sha });
}

export async function PUT(req: NextRequest, { params }: Props) {
  const { slug } = await params;
  const { frontmatter, content, sha } = await req.json();
  const fm = matter.stringify(content, frontmatter);
  await putFile(`content/articles/${slug}.md`, fm, `Update article: ${frontmatter.title}`, sha);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const { slug } = await params;
  const file = await getFile(`content/articles/${slug}.md`);
  if (!file) return NextResponse.json(null, { status: 404 });
  await deleteFile(`content/articles/${slug}.md`, file.sha, `Delete article: ${slug}`);
  return NextResponse.json({ ok: true });
}
