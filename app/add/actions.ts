'use server';

import { getSession } from '@/lib/session';
import { postSchema } from './scheam';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    content: formData.get('content'),
  };
  const result = await postSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const post = await db.post.create({
        data: {
          photo: result.data.photo,
          title: result.data.title,
          content: result.data.content,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      revalidateTag('home-post');
      redirect(`/home`);
    }
  }
}

export async function getUploadUrl() {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
}
