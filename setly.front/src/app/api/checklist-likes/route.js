import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const LIKES_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'checklist-likes.json');

async function getCounts() {
  try {
    const raw = await fs.readFile(LIKES_JSON_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return typeof data === 'object' && data !== null ? data : {};
  } catch {
    return {};
  }
}

async function saveCounts(counts) {
  await fs.writeFile(LIKES_JSON_PATH, JSON.stringify(counts, null, 2), 'utf-8');
}

/** GET — все счётчики лайков по id чеклиста */
export async function GET() {
  try {
    const counts = await getCounts();
    return NextResponse.json(counts);
  } catch (err) {
    console.error('[API GET checklist-likes]', err);
    return NextResponse.json({ message: err.message || 'Ошибка' }, { status: 500 });
  }
}

/** POST — обновить счётчик: like (+1) или unlike (-1) */
export async function POST(request) {
  try {
    const body = await request.json();
    const checklistId = typeof body?.checklistId === 'string' ? body.checklistId.trim() : null;
    const action = body?.action === 'like' || body?.action === 'unlike' ? body.action : null;

    if (!checklistId) {
      return NextResponse.json({ message: 'checklistId не указан' }, { status: 400 });
    }
    if (!action) {
      return NextResponse.json({ message: 'action должен быть like или unlike' }, { status: 400 });
    }

    const counts = await getCounts();
    const current = typeof counts[checklistId] === 'number' ? counts[checklistId] : 0;
    const next = action === 'like' ? current + 1 : Math.max(0, current - 1);
    counts[checklistId] = next;
    await saveCounts(counts);

    return NextResponse.json({ [checklistId]: next });
  } catch (err) {
    console.error('[API POST checklist-likes]', err);
    return NextResponse.json({ message: err.message || 'Ошибка обновления' }, { status: 500 });
  }
}
