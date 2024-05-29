'use client';

import { InitialPosts } from '../page';
import { useEffect, useRef, useState } from 'react';
import { getCachedMorePost } from '../actions';
import HomePost from './HomePost';

interface HomeListProps {
  initialPosts: InitialPosts;
  userId?: number;
  take: number;
}

export default function HomeList({ initialPosts, userId, take }: HomeListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const observeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const element = entries[0];
        if (element.isIntersecting && observeRef.current) {
          observer.unobserve(observeRef.current);
          setIsLoading(true);
          const newPost = await getCachedMorePost(take, page + take);
          if (newPost.length !== 0) {
            setPage((prev) => prev + take);
            setPosts((prev) => [...prev, ...newPost]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (observeRef.current) {
      observer.observe(observeRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center px-5 mx-auto gap-4 min-h-screen mb-20 ">
        {posts.map((post, idx) => (
          <HomePost key={post.id} {...post} userId={userId} />
        ))}
        {!isLastPage ? (
          <span ref={observeRef} className="text-sm text-white font-semibold bg-sky-400 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95">
            {isLoading ? '로딩 중...' : '더 보기'}
          </span>
        ) : null}
      </div>
      <div className="min-h-screen"></div>
    </>
  );
}
