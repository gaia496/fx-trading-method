import Link from "next/link";
import config from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プロフィール",
  description: "FX Trading Method 管理人のプロフィールとYouTubeチャンネルのご案内",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-amber-400">プロフィール</h1>
        <p className="text-slate-400">管理人について</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 space-y-4 text-slate-300 leading-relaxed">
        <p>
          FXトレーダー。テクニカル分析を軸に相場と向き合っています。
        </p>
        <p>
          このブログでは自身のトレード経験をもとに、中〜上級者向けの実践的な内容を発信しています。
          「勝てるトレーダーが実際に何を考えているか」を率直に書くことを心がけています。
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">活動チャンネル</h2>
        <p className="text-slate-400 text-sm">
          YouTubeではトレード解説・相場分析・手法の詳細を動画で発信しています。
        </p>
        <div className="flex flex-col gap-3">
          {config.social.youtube && (
            <a
              href={config.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-fit"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
              </svg>
              YouTubeチャンネルを見る
            </a>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-700">
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}
