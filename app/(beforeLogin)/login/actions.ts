'use server';

import db from '@/lib/db';
import { z } from 'zod';
import bycrypt from 'bcrypt';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const checkedEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const loginSchema = z.object({
  email: z
    .string({
      required_error: '이메일을 적어주세요.',
    })
    .email()
    .refine(checkedEmail, '유효하지 않는 이메일 주소입니다.'),
  password: z
    .string({
      required_error: '비밀번호를 적어주세요.',
    })
    .min(8, '비밀번호는 8글자 이상입니다.'),
});

export default async function loginAction(prevData: any, loginData: FormData) {
  const data = {
    email: loginData.get('email'),
    password: loginData.get('password'),
  };
  const result = await loginSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bycrypt.compare(result.data.password, user!.password ?? '');
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect('/home');
    } else {
      return {
        fieldErrors: {
          password: ['비밀번호가 틀립니다.'],
          email: [],
        },
      };
    }
  }
  return {
    error: ['wrong password', 'password too short'],
  };
}
