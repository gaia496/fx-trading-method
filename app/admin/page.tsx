import Link from 'next/link';
import config from '@/config';

async function getArticles() {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  const res = await fetch(`${base}/api/admin/articles`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">記事管理</h1>
          <div className="flex gap-3">
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              サイトを見る →
            </Link>
            <Link
              href="/admin/new"
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              + 新規記事
            </Link>
          </div>
        </div>

        {articles.length === 0 ? (
          <p className="text-slate-500 py-12 text-center">記事がありません。新規作成してみましょう。</p>
        ) : (
          <div className="space-y-0">
            {articles.map((a: { slug: string; title: string; date: string; category: string }, i: number) => (
              <div
                key={a.slug}
                className={`flex items-center justify-between py-4 gap-4 ${i !== articles.length - 1 ? 'border-b border-slate-800' : ''}`}
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600">
                      {config.categories.find(c => c.slug === a.category)?.name ?? a.category}
                    </span>
                    <span className="text-xs text-slate-700">{a.date}</span>
                  </div>
                  <p className="text-slate-200 font-medium truncate">{a.title}</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Link
                    href={`/articles/${a.slug}`}
                    target="_blank"
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    表示
                  </Link>
                  <Link
                    href={`/admin/edit/${a.slug}`}
                    className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    編集
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
