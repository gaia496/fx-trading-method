import Link from "next/link";
import config from "@/config";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 px-6 py-8 mt-8">
      <div className="mx-auto max-w-2xl flex items-center justify-between text-xs text-slate-700">
        <span>© {new Date().getFullYear()} {config.name}</span>
        <Link href="/disclaimer" className="hover:text-slate-400 transition-colors">
          免責事項
        </Link>
      </div>
    </footer>
  );
}
