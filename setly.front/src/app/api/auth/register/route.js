import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const USERS_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'users.json');

async function getUsers() {
  const raw = await fs.readFile(USERS_JSON_PATH, 'utf-8');
  return JSON.parse(raw);
}

function generateUserId(email) {
  const base = (email || 'user').replace(/@.+$/, '').replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'user';
  return `${base}-${Date.now()}`;
}

/**
 * POST — регистрация нового пользователя.
 * Тело: { nickname, email, password }.
 * Ответ: { ok: true, user } или { ok: false, error }.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const nickname = (body.nickname ?? '').trim().replace(/\s+/g, ' ');
    const email = (body.email ?? '').trim().toLowerCase();
    const password = (body.password ?? '').trim();

    if (!nickname || !email || !password) {
      return NextResponse.json({ ok: false, error: 'fill_required' });
    }

    const users = await getUsers();
    if (users.some((u) => (u.email || '').toLowerCase() === email)) {
      return NextResponse.json({ ok: false, error: 'email_exists' });
    }
    const nicknameLower = nickname.toLowerCase();
    if (users.some((u) => (u.nickname || '').toLowerCase() === nicknameLower)) {
      return NextResponse.json({ ok: false, error: 'nickname_exists' });
    }

    const id = generateUserId(email);
    const newUser = {
      id,
      nickname,
      email,
      password,
      passwordHash: 'placeholder-hash-replace-in-production',
      avatarPath: '',
      headerImagePath: '',
      createdChecklistIds: [],
      likedChecklistIds: [],
    };

    users.push(newUser);
    await fs.writeFile(USERS_JSON_PATH, JSON.stringify(users, null, 2), 'utf-8');

    const { password: _p, passwordHash: _h, ...publicUser } = newUser;
    return NextResponse.json({ ok: true, user: publicUser });
  } catch (err) {
    console.error('[API POST register]', err);
    return NextResponse.json(
      { ok: false, error: 'server_error' },
      { status: 500 }
    );
  }
}
