import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleWithHtml, getArticleSlugs } from "@/lib/articles";
import config from "@/config";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleWithHtml(slug);
  if (!article) return {};
  return { title: article.title, description: article.description };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleWithHtml(slug);
  if (!article) notFound();

  const categoryName =
    config.categories.find((c) => c.slug === article.category)?.name ?? article.category;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="space-y-3 mb-10">
        <div className="flex items-center gap-3 text-sm">
          <Link
            href={`/category/${article.category}`}
            className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            {categoryName}
          </Link>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500">{article.date}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-100 leading-tight">{article.title}</h1>
        <p className="text-slate-400 text-lg">{article.description}</p>
      </div>

      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
      />

      <div className="mt-12 pt-8 border-t border-slate-700 text-sm text-slate-500">
        ※当記事は情報提供を目的としており、投資を推奨するものではありません。
        <Link href="/disclaimer" className="underline ml-1 hover:text-slate-400">
          免責事項
        </Link>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          ← 記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
