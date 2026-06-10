import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ── Local filesystem scan (dev) ──
function findFiles(dir: string, exts: string[]): string[] {
  const result: string[] = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && !['node_modules', '.next', '.git'].includes(entry.name)) {
        result.push(...findFiles(full, exts));
      } else if (entry.isFile() && exts.some(ext => entry.name.endsWith(ext))) {
        result.push(full);
      }
    }
  } catch { /* ignore permission errors */ }
  return result;
}

// ── GitHub API commit ──
async function saveViaGitHub(oldClassName: string, newClassName: string): Promise<string[]> {
  const token  = process.env.GITHUB_TOKEN!;
  const owner  = process.env.GITHUB_OWNER  || 'hoaiqt-web';
  const repo   = process.env.GITHUB_REPO   || 'baolam-website-fe';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const apiBase = `https://api.github.com/repos/${owner}/${repo}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Search for files containing the old className
  const q = encodeURIComponent(`"${oldClassName}" repo:${owner}/${repo}`);
  const searchRes = await fetch(`https://api.github.com/search/code?q=${q}&per_page=10`, { headers });
  if (!searchRes.ok) throw new Error(`GitHub search failed: ${searchRes.status}`);
  const { items = [] } = await searchRes.json();

  const filesChanged: string[] = [];

  for (const item of items) {
    // Get file content + SHA
    const fileRes = await fetch(`${apiBase}/contents/${item.path}?ref=${branch}`, { headers });
    if (!fileRes.ok) continue;
    const fileData = await fileRes.json();
    const content  = Buffer.from(fileData.content, 'base64').toString('utf-8');

    if (!content.includes(oldClassName)) continue;

    const newContent = content.split(oldClassName).join(newClassName);
    const encoded    = Buffer.from(newContent).toString('base64');

    const updateRes = await fetch(`${apiBase}/contents/${item.path}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `inspector: cập nhật layout qua Inspector tool`,
        content: encoded,
        sha: fileData.sha,
        branch,
      }),
    });

    if (updateRes.ok) filesChanged.push(item.path);
  }

  return filesChanged;
}

// ── Local filesystem save (fallback for local dev) ──
function saveLocally(oldClassName: string, newClassName: string): string[] {
  const srcDir = path.join(process.cwd(), 'src');
  const files  = findFiles(srcDir, ['.tsx', '.ts', '.jsx', '.js']);
  const filesChanged: string[] = [];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes(oldClassName)) {
      fs.writeFileSync(file, content.split(oldClassName).join(newClassName), 'utf-8');
      filesChanged.push(path.relative(process.cwd(), file));
    }
  }
  return filesChanged;
}

export async function POST(req: NextRequest) {
  try {
    const { oldClassName, newClassName } = await req.json();

    if (!oldClassName || !newClassName) {
      return NextResponse.json({ error: 'Thiếu thông tin className' }, { status: 400 });
    }
    if (oldClassName === newClassName) {
      return NextResponse.json({ success: true, filesChanged: [], message: 'Không có thay đổi nào' });
    }

    let filesChanged: string[] = [];
    let mode = 'local';

    if (process.env.GITHUB_TOKEN) {
      // Production: commit to GitHub → Railway auto-deploys
      mode = 'github';
      filesChanged = await saveViaGitHub(oldClassName, newClassName);
    } else if (process.env.NODE_ENV === 'development') {
      // Local dev: write directly to filesystem
      filesChanged = saveLocally(oldClassName, newClassName);
    } else {
      return NextResponse.json({
        error: 'Chưa cấu hình GITHUB_TOKEN. Vui lòng thêm vào Railway Environment Variables.',
        hint: 'Xem hướng dẫn trong Inspector panel.',
      }, { status: 501 });
    }

    return NextResponse.json({
      success: true,
      mode,
      filesChanged,
      message: filesChanged.length > 0
        ? mode === 'github'
          ? `✅ Đã commit ${filesChanged.length} file lên GitHub — Railway đang deploy...`
          : `✅ Đã lưu vào ${filesChanged.length} file local`
        : '⚠️ Không tìm thấy className trong source code',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Inspector Save]', message);
    return NextResponse.json({ error: `Lỗi: ${message}` }, { status: 500 });
  }
}
