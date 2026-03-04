import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const USERS_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'users.json');

async function getUsers() {
  const raw = await fs.readFile(USERS_JSON_PATH, 'utf-8');
  return JSON.parse(raw);
}

/**
 * POST — проверка логина (email + пароль).
 * Тело: { email, password }.
 * Ответ: { ok: true, user } или { ok: false, error: 'wrong_password' | 'email_not_found' }.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const email = (body.email ?? '').trim().toLowerCase();
    const password = body.password ?? '';

    if (!email) {
      return NextResponse.json({ ok: false, error: 'email_not_found' });
    }

    const users = await getUsers();
    const user = users.find((u) => (u.email || '').toLowerCase() === email);

    if (!user) {
      return NextResponse.json({ ok: false, error: 'email_not_found' });
    }

    // Сравнение пароля: поле password (для демо) или passwordHash в продакшене
    const storedPassword = user.password ?? user.passwordHash ?? '';
    const passwordMatch =
      typeof storedPassword === 'string' && storedPassword.length > 0
        ? password === storedPassword
        : false;

    if (!passwordMatch) {
      return NextResponse.json({ ok: false, error: 'wrong_password' });
    }

    const { password: _p, passwordHash: _h, ...publicUser } = user;
    return NextResponse.json({ ok: true, user: publicUser });
  } catch (err) {
    console.error('[API POST login]', err);
    return NextResponse.json(
      { ok: false, error: 'email_not_found' },
      { status: 500 }
    );
  }
}
