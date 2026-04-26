import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const USER_AVATAR_PREFIX = '/img/users/avatars/';
const USER_HEADER_PREFIX = '/img/users/headers/';

/** Разрешённые пути картинок профиля (защита от path traversal и посторонних URL). */
function isSafeUserImagePath(p) {
  if (p === '' || p === undefined) return true;
  if (typeof p !== 'string' || p.length > 512) return false;
  const t = p.trim();
  if (!t.startsWith('/') || t.includes('..') || t.includes('\\')) return false;
  return t.startsWith(USER_AVATAR_PREFIX) || t.startsWith(USER_HEADER_PREFIX);
}

const USERS_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'users.json');
const LIKES_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'checklist-likes.json');

async function getLikesCounts() {
  try {
    const raw = await fs.readFile(LIKES_JSON_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return typeof data === 'object' && data !== null ? data : {};
  } catch {
    return {};
  }
}

async function getUsers() {
  const raw = await fs.readFile(USERS_JSON_PATH, 'utf-8');
  return JSON.parse(raw);
}

/** GET — публичные данные пользователя (без пароля) */
export async function GET(request, { params }) {
  try {
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json({ message: 'userId не указан' }, { status: 400 });
    }
    const users = await getUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }
    const { passwordHash, ...publicUser } = user;
    return NextResponse.json(publicUser);
  } catch (err) {
    console.error('[API GET users]', err);
    return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}

/** PATCH — обновление headerImagePath / avatarPath / likedChecklistIds / nickname / email / password */
export async function PATCH(request, { params }) {
  try {
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json({ message: 'userId не указан' }, { status: 400 });
    }

    const body = await request.json();
    const {
      headerImagePath,
      avatarPath,
      likedChecklistIds,
      nickname,
      email,
      newPassword,
      currentPassword,
      currentEmail,
    } = body;

    const users = await getUsers();
    const index = users.findIndex((u) => u.id === userId);
    let resolvedUserIndex = index;
    if (resolvedUserIndex === -1) {
      const currentEmailTrim = typeof currentEmail === 'string' ? currentEmail.trim().toLowerCase() : '';
      if (currentEmailTrim) {
        resolvedUserIndex = users.findIndex((u) => (u.email || '').toLowerCase() === currentEmailTrim);
      }
    }
    if (resolvedUserIndex === -1) {
      return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }

    const user = users[resolvedUserIndex];

    if (typeof headerImagePath === 'string') {
      const t = headerImagePath.trim();
      if (!isSafeUserImagePath(t)) {
        return NextResponse.json(
          { message: 'Недопустимый путь к изображению шапки' },
          { status: 400 }
        );
      }
      user.headerImagePath = t;
    }
    if (typeof avatarPath === 'string') {
      const t = avatarPath.trim();
      if (!isSafeUserImagePath(t)) {
        return NextResponse.json(
          { message: 'Недопустимый путь к аватару' },
          { status: 400 }
        );
      }
      user.avatarPath = t;
    }
    if (Array.isArray(likedChecklistIds)) {
      user.likedChecklistIds = likedChecklistIds.filter(
        (id) => typeof id === 'string' && id.trim() !== ''
      );
    }

    const normalizeNickname = (v) => String(v ?? '').trim().replace(/\s+/g, ' ');

    const nicknameTrimmed =
      nickname !== undefined ? normalizeNickname(nickname) : null;
    const nicknameChanged =
      nickname !== undefined &&
      nicknameTrimmed !== normalizeNickname(user.nickname ?? '');

    const emailTrimmed =
      email !== undefined ? String(email).trim().toLowerCase() : null;
    const emailChanged =
      email !== undefined &&
      emailTrimmed &&
      emailTrimmed !== (user.email || '').toLowerCase();

    let passwordChangeRequested = false;
    if (newPassword !== undefined) {
      const pwd = String(newPassword).replace(/\s/g, '');
      passwordChangeRequested = pwd.length > 0;
    }

    const needsCurrentPassword =
      nicknameChanged || emailChanged || passwordChangeRequested;

    if (needsCurrentPassword) {
      if (currentPassword !== user.password) {
        return NextResponse.json(
          { message: 'Спокойно. Пароли не совпадают' },
          { status: 400 }
        );
      }
    }

    if (nicknameChanged && nicknameTrimmed.length <= 40) {
      user.nickname = nicknameTrimmed;
    }

    if (emailChanged) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(emailTrimmed)) {
        return NextResponse.json(
          { message: 'Некорректная почта' },
          { status: 400 }
        );
      }
      const emailTaken = users.some(
        (u) => u.id !== user.id && (u.email || '').toLowerCase() === emailTrimmed
      );
      if (emailTaken) {
        return NextResponse.json(
          { message: 'Спокойно! Пользователь с данной почтой уже зарегистрирован' },
          { status: 400 }
        );
      }
      user.email = emailTrimmed;
    }

    if (passwordChangeRequested) {
      const pwd = String(newPassword).replace(/\s/g, '');
      if (
        pwd.length < 6 ||
        !/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;':",./<>?`~\\]*$/.test(pwd)
      ) {
        return NextResponse.json(
          { message: 'Некорректный пароль' },
          { status: 400 }
        );
      }
      if (pwd === user.password) {
        return NextResponse.json(
          { message: 'Новый пароль должен отличаться от текущего' },
          { status: 400 }
        );
      }
      user.password = pwd;
    }

    await fs.writeFile(USERS_JSON_PATH, JSON.stringify(users, null, 2), 'utf-8');

    const { password: _p, passwordHash: _h, ...publicUser } = user;
    return NextResponse.json(publicUser);
  } catch (err) {
    console.error('[API PATCH users]', err);
    return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}

/** DELETE — анонимизация аккаунта по паролю (данные «закомментированы», файлы не удаляем) */
export async function DELETE(request, { params }) {
  try {
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json({ message: 'userId не указан' }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const { currentPassword } = body;

    if (currentPassword === undefined || currentPassword === null) {
      return NextResponse.json(
        { message: 'Введите пароль для подтверждения удаления' },
        { status: 400 }
      );
    }

    const users = await getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }

    const user = users[index];
    if (user.password !== currentPassword) {
      return NextResponse.json(
        { message: 'Неверный пароль' },
        { status: 400 }
      );
    }

    const likedIds = Array.isArray(user.likedChecklistIds) ? [...user.likedChecklistIds] : [];
    if (likedIds.length > 0) {
      const counts = await getLikesCounts();
      for (const checklistId of likedIds) {
        const id = typeof checklistId === 'string' ? checklistId.trim() : '';
        if (!id) continue;
        const current = typeof counts[id] === 'number' ? counts[id] : 0;
        counts[id] = Math.max(0, current - 1);
      }
      await fs.writeFile(LIKES_JSON_PATH, JSON.stringify(counts, null, 2), 'utf-8');
    }

    user.nickname = '[deleted]';
    user.email = '';
    user.password = '';
    user.createdChecklistIds = [];
    user.likedChecklistIds = [];
    if (user.passwordHash) user.passwordHash = '';

    await fs.writeFile(USERS_JSON_PATH, JSON.stringify(users, null, 2), 'utf-8');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[API DELETE users]', err);
    return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
