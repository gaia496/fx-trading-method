import Link from "next/link";
import config from "@/config";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles().slice(0, 8);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 space-y-20">
      {/* Intro */}
      <section className="space-y-5">
        <p className="text-slate-400 text-sm tracking-widest uppercase">FX / Trading</p>
        <h1 className="text-4xl font-bold text-white leading-tight">
          相場に向き合う、<br />トレーダーの記録。
        </h1>
        <p className="text-slate-400 leading-relaxed">
          テクニカル分析を軸に実際のトレードで学んだことを書いています。
          教科書的な内容より、実践でしか分からないことを優先します。
        </p>
        {config.social.youtube && (
          <a
            href={config.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
            </svg>
            YouTubeでも発信中 →
          </a>
        )}
      </section>

      {/* Articles */}
      <section className="space-y-0">
        <p className="text-xs tracking-widest uppercase text-slate-600 mb-6">Articles</p>
        {articles.length === 0 ? (
          <p className="text-slate-600">記事はまだありません。</p>
        ) : (
          <div>
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className={`group block py-6 ${i !== articles.length - 1 ? "border-b border-slate-800" : ""}`}
              >
                <div className="flex items-baseline justify-between gap-6">
                  <div className="space-y-1.5 min-w-0">
                    <span className="text-xs text-slate-600">
                      {config.categories.find((c) => c.slug === article.category)?.name ?? article.category}
                    </span>
                    <h2 className="text-slate-200 group-hover:text-white transition-colors font-medium leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-sm text-slate-500 line-clamp-1">{article.description}</p>
                  </div>
                  <span className="text-xs text-slate-700 shrink-0 tabular-nums">{article.date}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="space-y-3">
        <p className="text-xs tracking-widest uppercase text-slate-600">Topics</p>
        <div className="flex flex-wrap gap-2">
          {config.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
