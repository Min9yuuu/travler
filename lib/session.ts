import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionId {
  id?: number;
}

export function getSession() {
  return getIronSession<SessionId>(cookies(), {
    cookieName: 'travler-session',
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function getSessionId() {
  const session = await getSession();
  return session.id;
}
