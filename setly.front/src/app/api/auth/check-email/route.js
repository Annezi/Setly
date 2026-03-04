import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const USERS_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'users.json');

async function getUsers() {
  const raw = await fs.readFile(USERS_JSON_PATH, 'utf-8');
  return JSON.parse(raw);
}

/** GET — проверка, занята ли почта (для формы регистрации) */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email')?.trim()?.toLowerCase();
    if (!email) {
      return NextResponse.json({ exists: false });
    }
    const users = await getUsers();
    const exists = users.some((u) => (u.email || '').toLowerCase() === email);
    return NextResponse.json({ exists });
  } catch (err) {
    console.error('[API GET check-email]', err);
    return NextResponse.json({ exists: false });
  }
}
