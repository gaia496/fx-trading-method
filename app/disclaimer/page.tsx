import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "免責事項",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold">免責事項</h1>

      <div className="space-y-8 text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">投資リスクについて</h2>
          <p>
            当サイトで提供する情報はすべて情報提供を目的としたものであり、特定の金融商品への投資を推奨・勧誘するものではありません。
            FX取引はレバレッジにより元本を超える損失が生じるリスクがあります。
            投資判断はご自身の責任において行ってください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">情報の正確性について</h2>
          <p>
            当サイトの情報は正確を期していますが、その完全性・正確性・最新性を保証するものではありません。
            掲載情報によって生じた損害について、当サイトは一切の責任を負いません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">著作権について</h2>
          <p>
            当サイトのコンテンツの著作権は管理人に帰属します。無断転載・複製を禁じます。
            引用する場合は出典を明記してください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">外部リンクについて</h2>
          <p>
            当サイトは外部サイトへのリンクを含む場合があります。リンク先のコンテンツや運営については当サイトは関与・保証しません。
          </p>
        </section>
      </div>
    </div>
  );
}
