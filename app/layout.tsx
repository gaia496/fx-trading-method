import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import config from "@/config";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.name,
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
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
