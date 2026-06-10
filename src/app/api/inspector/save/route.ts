import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

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

    // Find all TSX/TS files in src/
    const srcDir = path.join(process.cwd(), 'src');
    const files = await glob('**/*.{tsx,ts,jsx,js}', { cwd: srcDir, absolute: true });

    const filesChanged: string[] = [];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      if (content.includes(oldClassName)) {
        // Replace ALL occurrences of the old className string
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
        : 'Không tìm thấy className trong code'
    });
  } catch (err) {
    console.error('[Inspector Save]', err);
    return NextResponse.json({ error: 'Lỗi khi ghi file' }, { status: 500 });
  }
}
