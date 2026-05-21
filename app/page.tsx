import Link from "next/link";
import config from "@/config";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles().slice(0, 6);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 space-y-16">
      {/* Hero */}
      <section className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-amber-400">{config.name}</h1>
          <p className="text-slate-300 leading-relaxed max-w-2xl">{config.description}</p>
          <div className="flex gap-3 pt-2 flex-wrap">
            {config.social.youtube && (
              <a
                href={config.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
                </svg>
                YouTubeチャンネル
              </a>
            )}
            {config.social.x && (
              <a
                href={config.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                X (Twitter)
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-l-4 border-amber-400 pl-4">カテゴリ</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {config.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-400/50 rounded-lg px-4 py-3 text-sm font-medium transition-all"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-l-4 border-amber-400 pl-4">最新記事</h2>
        {articles.length === 0 ? (
          <p className="text-slate-500 py-8 text-center">記事はまだありません。</p>
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
                    <span className="text-xs text-amber-400 font-medium">
                      {config.categories.find((c) => c.slug === article.category)?.name ?? article.category}
                    </span>
                    <h3 className="font-semibold text-slate-100 leading-snug">{article.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{article.description}</p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0 mt-0.5">{article.date}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
