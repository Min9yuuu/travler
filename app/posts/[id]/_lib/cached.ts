'use server';

import db from '@/lib/db';
import { unstable_cache } from 'next/cache';

// Post Cache

export async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    return post;
  } catch (e) {}
}

export const getCachedPost = unstable_cache(getPost, ['post-detail'], {
  tags: ['post-detail'],
  revalidate: 60,
});

//Like Cache

async function getLikeStatus(userId: number, postId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

export const getCachedLikeStatus = (userId: number, postId: number) => {
  const cachedOperation = unstable_cache(getLikeStatus, ['post-like-status'], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(userId, postId);
};

// Comment Cache

async function getComments(postId: number) {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    select: {
      id: true,
      userId: true,
      postId: true,
      created_at: true,
      comment: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return comments;
}

export const getCachedComments = (postId: number) => {
  const cacheComment = unstable_cache(getComments, ['post-comments'], {
    tags: [`post-comments-${postId}`],
  });
  return cacheComment(postId);
};

// User Cache

async function getUser(userId: number) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  return { username: user?.username, avatar: user?.avatar };
}

export const getCachedUser = async (userId: number) => {
  const cacheUser = unstable_cache(getUser, ['login-user'], {
    tags: ['login-user'],
  });
  return cacheUser(userId);
};
