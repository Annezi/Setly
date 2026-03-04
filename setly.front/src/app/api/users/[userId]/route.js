import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

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
    return NextResponse.json(
      { message: err.message || 'Ошибка' },
      { status: 500 }
    );
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
    } = body;

    const users = await getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }

    const user = users[index];

    if (typeof headerImagePath === 'string') {
      user.headerImagePath = headerImagePath;
    }
    if (typeof avatarPath === 'string') {
      user.avatarPath = avatarPath;
    }
    if (Array.isArray(likedChecklistIds)) {
      user.likedChecklistIds = likedChecklistIds.filter(
        (id) => typeof id === 'string' && id.trim() !== ''
      );
    }

    if (nickname !== undefined) {
      const trimmed = String(nickname).trim().replace(/\s+/g, ' ');
      if (trimmed.length <= 40) {
        user.nickname = trimmed;
      }
    }

    if (email !== undefined || newPassword !== undefined) {
      const needCurrentForEmail = email !== undefined;
      const currentOk = currentPassword !== undefined && user.password === currentPassword;
      if (email !== undefined) {
        if (!currentOk) {
          return NextResponse.json(
            { message: 'Спокойно! Для изменения почты введите свой текущий пароль' },
            { status: 400 }
          );
        }
        const emailTrimmed = String(email).trim().toLowerCase();
        if (emailTrimmed && /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(emailTrimmed)) {
          const emailTaken = users.some(
            (u) => u.id !== userId && (u.email || '').toLowerCase() === emailTrimmed
          );
          if (emailTaken) {
            return NextResponse.json(
              { message: 'Спокойно! Пользователь с данной почтой уже зарегистрирован' },
              { status: 400 }
            );
          }
          user.email = emailTrimmed;
        }
      }
      if (newPassword !== undefined) {
        const onlyPasswordChange = email === undefined;
        if (!onlyPasswordChange && !currentOk) {
          return NextResponse.json(
            { message: 'Спокойно! Пароль не верный...' },
            { status: 400 }
          );
        }
        const pwd = String(newPassword).replace(/\s/g, '');
        if (pwd.length >= 6 && /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;':",./<>?`~\\]*$/.test(pwd)) {
          user.password = pwd;
        }
      }
    }

    await fs.writeFile(USERS_JSON_PATH, JSON.stringify(users, null, 2), 'utf-8');

    const { password: _p, passwordHash: _h, ...publicUser } = user;
    return NextResponse.json(publicUser);
  } catch (err) {
    console.error('[API PATCH users]', err);
    return NextResponse.json(
      { message: err.message || 'Ошибка обновления' },
      { status: 500 }
    );
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
    return NextResponse.json(
      { message: err.message || 'Ошибка удаления' },
      { status: 500 }
    );
  }
}
