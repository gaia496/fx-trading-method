import Link from "next/link";
import config from "@/config";

export default function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-slate-900 px-6 py-8 mt-16">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="flex flex-wrap gap-4 text-sm text-slate-400 justify-center">
          <Link href="/" className="hover:text-white transition-colors">
            ホーム
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            プロフィール
          </Link>
          <Link href="/disclaimer" className="hover:text-white transition-colors">
            免責事項
          </Link>
          {config.social.youtube && (
            <a
              href={config.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
          )}
        </div>
        <p className="text-center text-xs text-slate-600">
          © {new Date().getFullYear()} {config.name} — 当サイトの情報は投資を推奨するものではありません
        </p>
      </div>
    </footer>
  );
}
