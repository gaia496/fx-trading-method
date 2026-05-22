import Link from 'next/link';
import config from '@/config';

async function getArticles() {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  try {
    const res = await fetch(`${base}/api/admin/articles`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getRecentCommits() {
  try {
    const res = await fetch(
      'https://api.github.com/repos/gaia496/fx-trading-method/commits?per_page=5',
      {
        headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
        cache: 'no-store',
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function AdminDashboard() {
  const [articles, commits] = await Promise.all([getArticles(), getRecentCommits()]);

  const totalArticles = articles.length;
  const categoryCount = config.categories.map(cat => ({
    ...cat,
    count: articles.filter((a: { category: string }) => a.category === cat.slug).length,
  }));
  const recentArticles = articles.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">ダッシュボード</h1>
            <p className="text-slate-500 text-sm mt-1">{config.name}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" target="_blank" className="text-sm text-slate-500 hover:text-white transition-colors">
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

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wider">総記事数</p>
            <p className="text-3xl font-bold text-white">{totalArticles}</p>
          </div>
          {categoryCount.map(cat => (
            <div key={cat.slug} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider">{cat.name}</p>
              <p className="text-3xl font-bold text-white">{cat.count}</p>
            </div>
          ))}
        </div>

        {/* Analytics link */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium text-slate-200">アクセス解析</p>
            <p className="text-sm text-slate-500">Vercel Analytics でPV数・訪問者数・流入元を確認できます</p>
          </div>
          <a
            href="https://vercel.com/gaia-s-projects1/fx-trading-method/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            開く →
          </a>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Recent articles */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-200">最近の記事</p>
              <Link href="/admin/articles" className="text-xs text-slate-500 hover:text-white transition-colors">
                すべて見る →
              </Link>
            </div>
            {recentArticles.length === 0 ? (
              <p className="text-slate-600 text-sm">記事がありません</p>
            ) : (
              <div className="space-y-3">
                {recentArticles.map((a: { slug: string; title: string; date: string; category: string }) => (
                  <div key={a.slug} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-slate-300 truncate">{a.title}</p>
                      <p className="text-xs text-slate-600">{a.date}</p>
                    </div>
                    <Link
                      href={`/admin/edit/${a.slug}`}
                      className="text-xs text-slate-500 hover:text-amber-400 transition-colors shrink-0"
                    >
                      編集
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent commits */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <p className="font-medium text-slate-200">最近の更新履歴</p>
            {commits.length === 0 ? (
              <p className="text-slate-600 text-sm">取得できませんでした</p>
            ) : (
              <div className="space-y-3">
                {commits.map((c: { sha: string; commit: { message: string; author: { date: string } } }) => (
                  <div key={c.sha} className="space-y-0.5">
                    <p className="text-sm text-slate-300 truncate">{c.commit.message}</p>
                    <p className="text-xs text-slate-600">
                      {new Date(c.commit.author.date).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Quick links */}
        <div className="border-t border-slate-800 pt-6 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link href="/admin/articles" className="hover:text-white transition-colors">記事一覧</Link>
          <a href="https://vercel.com/gaia-s-projects1/fx-trading-method" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Vercelダッシュボード</a>
          <a href="https://github.com/gaia496/fx-trading-method" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.a8.net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">A8.net</a>
        </div>

      </div>
    </div>
  );
}
