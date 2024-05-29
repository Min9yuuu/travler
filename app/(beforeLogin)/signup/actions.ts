'use server';

import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

const checkedPassword = ({ password, password_confirm }: { password: string; password_confirm: string }) => password == password_confirm;

const signupSchema = z
  .object({
    username: z
      .string({
        required_error: '유저이름을 적어주세요.',
      })
      .min(2, '유저이름이 너무 짧습니다.')
      .max(10, '유저이름이 너무 깁니다.')
      .toLowerCase()
      .trim(),
    email: z
      .string({
        required_error: '이메일을 적어주세요.',
      })
      .email(),
    password: z
      .string({
        required_error: '비밀번호를 적어주세요.',
      })
      .min(8, '비밀번호가 너무 짧습니다.'),
    password_confirm: z
      .string({
        required_error: '비밀번호를 확인해주세요.',
      })
      .min(8, '비밀번호를 다시한번 확인해주세요.'),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '사용하고 있는 유저이름입니다.',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '사용하고 있는 이메일입니다.',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkedPassword, {
    message: '비밀번호와 다릅니다. 비밀번호를 다시 한번 확인해주세요.',
    path: ['password_confirm'],
  });

export async function signUpAction(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    password_confirm: formData.get('password_confirm'),
  };
  const result = await signupSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect('/home');
  }
}
