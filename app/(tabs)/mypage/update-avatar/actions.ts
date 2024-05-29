'use server';

import db from '@/lib/db';
import { getSessionId } from '@/lib/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const avatarScheam = z.object({
  avatar: z.string({ required_error: '변경할 이미지를 선택해주세요' }),
});

export async function updateAvatar(_: any, formData: FormData) {
  const data = {
    avatar: formData.get('avatar'),
  };
  const result = await avatarScheam.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const userId = await getSessionId();
    const user = await db.user.update({
      where: {
        id: userId!,
      },
      data: {
        avatar: result.data.avatar,
      },
    });
    redirect('/mypage');
  }
}
