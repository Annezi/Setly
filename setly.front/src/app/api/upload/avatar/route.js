import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const AVATARS_DIR = path.join(process.cwd(), 'public', 'img', 'users', 'avatars');

/** Проверяет, что path ведёт внутрь AVATARS_DIR (защита от path traversal). */
function isPathInsideAvatarsDir(publicPath) {
  if (!publicPath || typeof publicPath !== 'string') return false;
  const normalized = path.normalize(publicPath).replace(/^\//, '');
  const fullPath = path.join(process.cwd(), 'public', normalized);
  const rel = path.relative(AVATARS_DIR, fullPath);
  return !rel.startsWith('..') && !path.isAbsolute(rel);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const userId = formData.get('userId')?.toString()?.trim();
    const previousPath = formData.get('previousPath')?.toString()?.trim();

    if (!file || typeof file.arrayBuffer !== 'function') {
      return NextResponse.json(
        { message: 'Файл не передан' },
        { status: 400 }
      );
    }
    if (!userId) {
      return NextResponse.json(
        { message: 'Не указан userId' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || '.jpg';
    const safeExt = /^\.(jpe?g|png|gif|webp)$/i.test(ext) ? ext : '.jpg';
    const filename = `${userId}-${Date.now()}${safeExt}`;
    const filepath = path.join(AVATARS_DIR, filename);

    await fs.mkdir(AVATARS_DIR, { recursive: true });
    await fs.writeFile(filepath, buffer);

    if (previousPath && isPathInsideAvatarsDir(previousPath)) {
      const normalizedPrev = previousPath.replace(/^\//, '');
      const prevFullPath = path.join(process.cwd(), 'public', normalizedPrev);
      try {
        await fs.unlink(prevFullPath);
      } catch (e) {
        if (e.code !== 'ENOENT') console.error('[API upload/avatar] delete previous', e);
      }
    }

    const publicPath = `/img/users/avatars/${filename}`;
    return NextResponse.json({ path: publicPath, avatarPath: publicPath });
  } catch (err) {
    console.error('[API upload/avatar]', err);
    return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
