import Link from "next/link";
import config from "@/config";

export default function Header() {
  return (
    <header className="border-b border-slate-700 bg-slate-900 px-6 py-4 sticky top-0 z-50">
      <div className="mx-auto max-w-4xl flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-amber-400 hover:text-amber-300 transition-colors">
          {config.name}
        </Link>
        <nav className="flex gap-6 text-sm text-slate-400">
          {config.categories.slice(0, 3).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="hover:text-white transition-colors hidden sm:block"
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/about" className="hover:text-white transition-colors">
            プロフィール
          </Link>
        </nav>
      </div>
    </header>
  );
}
