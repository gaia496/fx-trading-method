import config from "@/config";

export default function Home() {
  return (
    <>
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-xl font-bold">{config.name}</h1>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-12 space-y-12">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-bold">{config.description}</h2>
          <p className="text-gray-500">無料・登録不要・ブラウザだけで使えます</p>
        </section>

        {/* Tool area — ここにツール本体を実装する */}
        <section className="bg-white rounded-2xl border p-8 min-h-64 flex items-center justify-center">
          <p className="text-gray-400">← ここにツールを実装する →</p>
        </section>

        {/* How to use */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold">使い方</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>ステップ1を書く</li>
            <li>ステップ2を書く</li>
            <li>ステップ3を書く</li>
          </ol>
        </section>
      </main>

      <footer className="border-t bg-white px-6 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} {config.name}
      </footer>
    </>
  );
}
