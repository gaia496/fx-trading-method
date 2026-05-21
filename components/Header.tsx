import Link from "next/link";
import config from "@/config";

export default function Header() {
  return (
    <header className="px-6 py-5 border-b border-slate-800">
      <div className="mx-auto max-w-2xl flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-white tracking-tight hover:text-slate-300 transition-colors">
          {config.name}
        </Link>
        <nav className="flex gap-5 text-sm text-slate-500">
          <Link href="/about" className="hover:text-white transition-colors">
            About
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
        </nav>
      </div>
    </header>
  );
}
