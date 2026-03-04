import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const COVERS_DIR = path.join(process.cwd(), "public", "img", "checklist-covers");

/** Проверяет, что publicPath ведёт внутрь COVERS_DIR (защита от path traversal). */
function isPathInsideCoversDir(publicPath) {
  if (!publicPath || typeof publicPath !== "string") return false;
  const normalized = path.normalize(publicPath).replace(/^\//, "");
  const fullPath = path.join(process.cwd(), "public", normalized);
  const rel = path.relative(COVERS_DIR, fullPath);
  return !rel.startsWith("..") && !path.isAbsolute(rel);
}

/**
 * POST — загрузка обложки будущего чек-листа.
 * Сохраняет файл в public/img/checklist-covers/{unique}.ext.
 * Возвращает { path } для использования при создании чек-листа (coverImagePath).
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const previousPath = formData.get("previousPath")?.toString()?.trim();

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json(
        { message: "Файл не передан" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || ".jpg";
    const safeExt = /^\.(jpe?g|png|gif|webp)$/i.test(ext) ? ext : ".jpg";
    const filename = `cover-${Date.now()}-${Math.random().toString(36).slice(2, 10)}${safeExt}`;
    const filepath = path.join(COVERS_DIR, filename);

    await fs.mkdir(COVERS_DIR, { recursive: true });
    await fs.writeFile(filepath, buffer);

    // Удалить ранее загруженную обложку (если перезалив в той же сессии)
    if (previousPath && isPathInsideCoversDir(previousPath)) {
      const normalizedPrev = previousPath.replace(/^\//, "");
      const prevFullPath = path.join(process.cwd(), "public", normalizedPrev);
      try {
        await fs.unlink(prevFullPath);
      } catch (e) {
        if (e.code !== "ENOENT")
          console.error("[API upload/cover] delete previous", e);
      }
    }

    const publicPath = `/img/checklist-covers/${filename}`;
    return NextResponse.json({ path: publicPath, coverImagePath: publicPath });
  } catch (err) {
    console.error("[API upload/cover]", err);
    return NextResponse.json(
      { message: err.message || "Ошибка загрузки" },
      { status: 500 }
    );
  }
}
