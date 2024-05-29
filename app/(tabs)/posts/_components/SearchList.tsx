'use client';

import { useEffect, useRef, useState } from 'react';
import { InitialPosts } from '../../home/page';
import { getCachedInitialSearchPost, getCachedMorePost, getCachedMoreSearchPost } from '../../home/actions';
import { getCachedLikeStatus } from '@/app/posts/[id]/_lib/cached';
import SearchPost from './SearchPost';

interface SearchProps {
  initialData: InitialPosts;
  searchParams?: {
    travle?: string;
  };
  userId: number;
  take: number;
}

export default function SearchList({ initialData, searchParams, userId, take }: SearchProps) {
  const [initialPosts, setInitialPosts] = useState<InitialPosts>(initialData);
  const [posts, setPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const observeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const initialData = async () => {
      if (!searchParams?.travle) {
        return;
      }
      const data = await getCachedInitialSearchPost(take, searchParams.travle);
      if (data) {
        setInitialPosts(data);
        setPosts(data);
      }
    };
    initialData();
  }, [searchParams?.travle]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const element = entries[0];
        if (element.isIntersecting && observeRef.current) {
          observer.unobserve(observeRef.current);
          setIsLoading(true);
          if (searchParams?.travle) {
            const newPost = await getCachedMoreSearchPost(take, page + take, searchParams?.travle!);
            if (newPost![0]) {
              if (newPost!.length !== 0) {
                setPage((prev) => prev + take);
                setPosts((prev) => [...prev, ...newPost!]);
              } else {
                setIsLastPage(true);
              }
              setIsLoading(false);
            } else {
              setPosts([]);
              setIsLoading(false);
            }
          }
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
  }, [page]);

  return (
    <>
      <div className="flex flex-col items-center p-2">
        <div className="grid grid-cols-2 gap-3">
          {posts.map((post, idx) => (
            <SearchPost post={post} userId={userId} key={idx} />
          ))}
        </div>
        {!isLastPage ? (
          <span ref={observeRef} className="mt-4 text-sm text-white font-semibold bg-sky-400 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95">
            {isLoading ? '로딩 중...' : '더 보기'}
          </span>
        ) : null}
      </div>
    </>
  );
}
