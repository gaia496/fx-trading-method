'use client';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import config from '@/config';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
}

interface Props {
  slug?: string;
  initialFrontmatter?: Frontmatter;
  initialContent?: string;
  sha?: string;
  mode: 'new' | 'edit';
}

export default function ArticleEditor({ slug: initialSlug, initialFrontmatter, initialContent, sha, mode }: Props) {
  const router = useRouter();
  const [slug, setSlug] = useState(initialSlug ?? '');
  const [frontmatter, setFrontmatter] = useState<Frontmatter>(
    initialFrontmatter ?? { title: '', description: '', date: new Date().toISOString().split('T')[0], category: 'strategy' }
  );
  const [content, setContent] = useState(initialContent ?? '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function updateFm(key: keyof Frontmatter, value: string) {
    setFrontmatter(prev => ({ ...prev, [key]: value }));
  }

  function autoSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 60);
  }

  async function handleSave() {
    if (!slug || !frontmatter.title) {
      setMessage('スラッグとタイトルは必須です');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const url = mode === 'new' ? '/api/admin/articles' : `/api/admin/articles/${slug}`;
      const method = mode === 'new' ? 'POST' : 'PUT';
      const body = mode === 'new'
        ? { slug, frontmatter, content }
        : { frontmatter, content, sha };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage('保存しました。30秒ほどでサイトに反映されます。');
        if (mode === 'new') router.push('/admin');
      } else {
        setMessage('保存に失敗しました');
      }
    } catch {
      setMessage('エラーが発生しました');
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm('この記事を削除しますか？')) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/articles/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/admin');
    } else {
      setMessage('削除に失敗しました');
      setDeleting(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
    if (res.ok) {
      const { url } = await res.json();
      setContent(prev => prev + `\n\n![画像](${url})\n`);
    } else {
      setMessage('画像のアップロードに失敗しました');
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <a href="/admin" className="text-sm text-slate-500 hover:text-white transition-colors">
            ← 一覧に戻る
          </a>
          <div className="flex gap-3 items-center">
            {message && <span className="text-sm text-amber-400">{message}</span>}
            {mode === 'edit' && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
              >
                {deleting ? '削除中...' : '削除'}
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold text-sm px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存・公開'}
            </button>
          </div>
        </div>

        {/* Meta fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <input
              type="text"
              placeholder="タイトル"
              value={frontmatter.title}
              onChange={e => {
                updateFm('title', e.target.value);
                if (mode === 'new') setSlug(autoSlug(e.target.value));
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-xl font-semibold text-slate-100 focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
            />
          </div>
          <div className="col-span-2">
            <input
              type="text"
              placeholder="一行説明（SEOに使われます）"
              value={frontmatter.description}
              onChange={e => updateFm('description', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
            />
          </div>
          <div>
            <select
              value={frontmatter.category}
              onChange={e => updateFm('category', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-amber-400"
            >
              {config.categories.map(c => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={frontmatter.date}
              onChange={e => updateFm('date', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-amber-400"
            />
            {mode === 'new' && (
              <input
                type="text"
                placeholder="slug（URL）"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-400 text-sm focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
              />
            )}
          </div>
        </div>

        {/* Image upload */}
        <div className="flex items-center gap-3">
          <label className="cursor-pointer text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 border border-slate-700 hover:border-slate-500 rounded-lg px-4 py-2">
            {uploading ? 'アップロード中...' : '+ 画像を挿入'}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          <span className="text-xs text-slate-600">画像は記事末尾に追加されます。ドラッグでカーソル位置に移動できます。</span>
        </div>

        {/* Editor */}
        <div data-color-mode="dark">
          <MDEditor
            value={content}
            onChange={v => setContent(v ?? '')}
            height={600}
            preview="live"
          />
        </div>
      </div>
    </div>
  );
}
