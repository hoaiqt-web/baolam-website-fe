import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function findFiles(dir: string, exts: string[]): string[] {
  const result: string[] = [];
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && !['node_modules', '.next', '.git'].includes(entry.name)) {
        result.push(...findFiles(full, exts));
      } else if (entry.isFile() && exts.some(ext => entry.name.endsWith(ext))) {
        result.push(full);
      }
    }
  } catch { /* skip */ }
  return result;
}

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  try {
    const { oldClassName, newClassName } = await req.json();

    if (!oldClassName || !newClassName) {
      return NextResponse.json({ error: 'Thiếu className' }, { status: 400 });
    }
    if (oldClassName === newClassName) {
      return NextResponse.json({ success: true, filesChanged: [], message: 'Không có thay đổi' });
    }

    const srcDir = path.join(process.cwd(), 'src');
    const filesChanged: string[] = [];

    for (const file of findFiles(srcDir, ['.tsx', '.ts', '.jsx', '.js'])) {
      const content = fs.readFileSync(file, 'utf-8');
      if (content.includes(oldClassName)) {
        fs.writeFileSync(file, content.split(oldClassName).join(newClassName), 'utf-8');
        filesChanged.push(path.relative(process.cwd(), file));
      }
    }

    return NextResponse.json({
      success: true,
      filesChanged,
      message: filesChanged.length > 0
        ? `Đã lưu vào ${filesChanged.length} file trên máy`
        : 'Không tìm thấy className trong code',
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: `Lỗi: ${err instanceof Error ? err.message : err}` }, { status: 500 });
  }
}
