'use server';

import { postSchema } from '@/app/add/scheam';
import db from '@/lib/db';
import { getSessionId } from '@/lib/session';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updatePost(formData: FormData, postId: number) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    content: formData.get('content'),
  };
  const result = postSchema.safeParse(data);
  console.log(result.success);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const userId = await getSessionId();
    if (userId) {
      const post = await db.post.update({
        where: {
          id: postId,
        },
        data: {
          photo: result.data.photo,
          title: result.data.title,
          content: result.data.content,
        },
      });
      revalidateTag('home-post');
      revalidateTag('post-detail');
      redirect(`/home`);
    }
  }
}
