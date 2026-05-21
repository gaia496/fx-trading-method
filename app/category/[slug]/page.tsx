import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticlesByCategory } from "@/lib/articles";
import config from "@/config";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return config.categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = config.categories.find((c) => c.slug === slug);
  if (!cat) return {};
  return { title: cat.name };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = config.categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const articles = getArticlesByCategory(slug);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 space-y-8">
      <div className="space-y-2">
        <p className="text-amber-400 text-sm font-medium">カテゴリ</p>
        <h1 className="text-3xl font-bold">{cat.name}</h1>
        <p className="text-slate-400">{articles.length}件の記事</p>
      </div>

      {articles.length === 0 ? (
        <p className="text-slate-500 py-12 text-center">このカテゴリの記事はまだありません。</p>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl p-5 transition-all hover:border-slate-600"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 min-w-0">
                  <h2 className="font-semibold text-slate-100 leading-snug">{article.title}</h2>
                  <p className="text-sm text-slate-400 line-clamp-2">{article.description}</p>
                </div>
                <span className="text-xs text-slate-500 shrink-0 mt-0.5">{article.date}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link href="/" className="inline-block text-sm text-slate-400 hover:text-white transition-colors">
        ← ホームに戻る
      </Link>
    </div>
  );
}
