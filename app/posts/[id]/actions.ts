'use server';

import db from '@/lib/db';
import { revalidatePath, revalidateTag } from 'next/cache';
import { commentSchema } from './schema';
import { notFound, redirect } from 'next/navigation';
import { getSessionId } from '@/lib/session';

// like
export async function likePost(userId: number, postId: number) {
  try {
    await db.like.create({
      data: {
        postId,
        userId,
      },
    });
    revalidateTag('home-post');
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}
export async function disLikePost(userId: number, postId: number) {
  try {
    await db.like.delete({
      where: {
        id: {
          postId,
          userId,
        },
      },
    });
    revalidateTag('home-post');
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}

// comment
export async function setComment(formData: FormData, userId: number, postId: number) {
  const data = {
    comment: formData.get('comment'),
  };
  const result = commentSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    try {
      if (userId && postId) {
        await db.comment.create({
          data: {
            comment: result.data.comment,
            post: {
              connect: { id: postId },
            },
            user: {
              connect: { id: userId },
            },
          },
        });
        revalidateTag(`post-comments-${postId}`);
      }
    } catch (e) {}
  }
}
export async function delComment(postId: number, userId: number, commentId: number) {
  if (!userId) {
    return notFound();
  }
  try {
    const deleteComment = await db.comment.delete({
      where: {
        id: commentId,
      },
    });
    if (!deleteComment) {
      return false;
    } else {
      revalidateTag(`post-comments-${postId}`);
    }
  } catch (e) {}
}

// delete

export async function delPost(postId: number, userId: number) {
  if (!userId) {
    return notFound();
  }
  const result = await db.post.delete({
    where: {
      id: postId,
      userId,
    },
  });
  if (!result) {
    return false;
  }
  revalidateTag('home-post');
  return true;
}

export async function deleteUrl(imgId: string) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${imgId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
}
