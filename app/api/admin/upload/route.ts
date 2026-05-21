import { NextRequest, NextResponse } from 'next/server';
import { putFile } from '@/lib/github';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString('base64');
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const path = `public/images/${filename}`;

  await putFile(path, '', `Upload image: ${filename}`, undefined);

  const res = await fetch(`https://api.github.com/repos/gaia496/fx-trading-method/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Upload image: ${filename}`,
      content: base64,
    }),
  });

  if (!res.ok) return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  return NextResponse.json({ url: `/images/${filename}` });
}
