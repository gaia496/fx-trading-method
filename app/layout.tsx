import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import config from "@/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: config.name, template: `%s | ${config.name}` },
  description: config.description,
  keywords: config.keywords,
  openGraph: {
    title: config.name,
    description: config.description,
    url: config.url,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={geist.className}>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
