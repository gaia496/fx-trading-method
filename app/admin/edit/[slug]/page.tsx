import { notFound } from 'next/navigation';
import ArticleEditor from '@/components/admin/ArticleEditor';

interface Props { params: Promise<{ slug: string }> }

async function getArticle(slug: string) {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  const res = await fetch(`${base}/api/admin/articles/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function EditArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <ArticleEditor
      mode="edit"
      slug={slug}
      initialFrontmatter={article.frontmatter}
      initialContent={article.content}
      sha={article.sha}
    />
  );
}
