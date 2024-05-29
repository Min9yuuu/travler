'use server';

import db from '@/lib/db';
import { unstable_cache } from 'next/cache';

export async function getInitialPost(take: number) {
  const post = await db.post.findMany({
    select: {
      id: true,
      photo: true,
      title: true,
      content: true,
      views: true,
      created_at: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    take: take,
    orderBy: {
      created_at: 'desc',
    },
  });
  return post;
}

export async function getInitialSearchPost(take: number, searchValue: string) {
  const post = await db.post.findMany({
    where: {
      OR: [{ title: { contains: searchValue } }, { content: { contains: searchValue } }],
    },
    select: {
      id: true,
      photo: true,
      title: true,
      content: true,
      views: true,
      created_at: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    take: take,
    orderBy: {
      created_at: 'desc',
    },
  });
  if (!post) return null;
  return post;
}

export async function getMorePost(take: number, page: number) {
  const post = await db.post.findMany({
    select: {
      id: true,
      photo: true,
      title: true,
      content: true,
      views: true,
      created_at: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    skip: page * take,
    take: take,
    orderBy: {
      created_at: 'desc',
    },
  });
  return post;
}

export async function getMoreSearchPost(take: number, page: number, searchValue: string) {
  const post = await db.post.findMany({
    where: {
      OR: [{ title: searchValue }, { content: searchValue }],
    },
    select: {
      id: true,
      photo: true,
      title: true,
      content: true,
      views: true,
      created_at: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    skip: page * take,
    take: take,
    orderBy: {
      created_at: 'desc',
    },
  });
  if (!post) return;
  return post;
}

export const getCachedInitialPost = unstable_cache(getInitialPost, ['home-inital-post'], {
  tags: ['home-post'],
  revalidate: 60,
});

export const getCachedMorePost = unstable_cache(getMorePost, ['home-more-post'], {
  tags: ['home-post'],
  revalidate: 60,
});

export const getCachedInitialSearchPost = unstable_cache(getInitialSearchPost, ['search-initial-post'], {
  tags: ['search-post', 'home-post'],
});

export const getCachedMoreSearchPost = unstable_cache(getMoreSearchPost, ['home-more-post'], {
  tags: ['search-post', 'home-post'],
  revalidate: 60,
});
