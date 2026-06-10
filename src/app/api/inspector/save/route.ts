import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Recursively find all .tsx/.ts/.jsx/.js files under a directory
function findFiles(dir: string, exts: string[]): string[] {
  const result: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', '.next', '.git'].includes(entry.name)) {
      result.push(...findFiles(full, exts));
    } else if (entry.isFile() && exts.some(ext => entry.name.endsWith(ext))) {
      result.push(full);
    }
  }
  return result;
}

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Chỉ khả dụng trong môi trường development' },
      { status: 403 }
    );
  }

  try {
    const { oldClassName, newClassName } = await req.json();

    if (!oldClassName || !newClassName) {
      return NextResponse.json({ error: 'Thiếu thông tin className' }, { status: 400 });
    }

    if (oldClassName === newClassName) {
      return NextResponse.json({ success: true, filesChanged: [], message: 'Không có thay đổi nào' });
    }

    const srcDir = path.join(process.cwd(), 'src');
    const files = findFiles(srcDir, ['.tsx', '.ts', '.jsx', '.js']);
    const filesChanged: string[] = [];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      if (content.includes(oldClassName)) {
        const updated = content.split(oldClassName).join(newClassName);
        fs.writeFileSync(file, updated, 'utf-8');
        filesChanged.push(path.relative(process.cwd(), file));
      }
    }

    return NextResponse.json({
      success: true,
      filesChanged,
      message: filesChanged.length > 0
        ? `Đã lưu vào ${filesChanged.length} file`
        : 'Không tìm thấy className trong code',
    });
  } catch (err) {
    console.error('[Inspector Save]', err);
    return NextResponse.json({ error: 'Lỗi khi ghi file' }, { status: 500 });
  }
}
