const OWNER = 'gaia496';
const REPO = 'fx-trading-method';
const BASE = 'https://api.github.com';

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };
}

export async function getFile(path: string) {
  const res = await fetch(`${BASE}/repos/${OWNER}/${REPO}/contents/${path}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function putFile(path: string, content: string, message: string, sha?: string) {
  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString('base64'),
  };
  if (sha) body.sha = sha;
  const res = await fetch(`${BASE}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteFile(path: string, sha: string, message: string) {
  const res = await fetch(`${BASE}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({ message, sha }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function listFiles(path: string) {
  const res = await fetch(`${BASE}/repos/${OWNER}/${REPO}/contents/${path}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}
