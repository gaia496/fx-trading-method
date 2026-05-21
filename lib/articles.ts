import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const articlesDir = path.join(process.cwd(), "content/articles");

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  content?: string;
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(".md", ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category ?? "",
    content,
  };
}

export async function getArticleWithHtml(slug: string): Promise<Article | null> {
  const article = getArticleBySlug(slug);
  if (!article || !article.content) return null;
  const processed = await remark().use(html).process(article.content);
  return { ...article, content: processed.toString() };
}

export function getAllArticles(): Article[] {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean)
    .sort(
      (a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()
    ) as Article[];
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}
