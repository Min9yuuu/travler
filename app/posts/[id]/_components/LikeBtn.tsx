'use client';

import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { useOptimistic } from 'react';
import { disLikePost, likePost } from '../actions';

interface LikeBtnProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
  userId: number;
}

export default function LikeBtn({ isLiked, likeCount, userId, postId }: LikeBtnProps) {
  const [state, reducerFn] = useOptimistic({ isLiked, likeCount }, (prevState, payload) => ({
    isLiked: !prevState.isLiked,
    likeCount: prevState.isLiked ? prevState.likeCount - 1 : prevState.likeCount + 1,
  }));
  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reducerFn(undefined);
    if (isLiked) {
      await disLikePost(userId, postId);
    } else {
      await likePost(userId, postId);
    }
  };

  return (
    <>
      <button onClickCapture={onClick} className="flex items-center justify-center gap-3">
        {isLiked ? <SolidHeartIcon className="h-8 text-red-500" /> : <OutlineHeartIcon className="h-8 text-neutral-500" />}
        <span className="text-neutral-500">{state.likeCount}</span>
      </button>
    </>
  );
}
