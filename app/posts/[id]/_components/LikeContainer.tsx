import React from 'react';
import LikeBtn from './LikeBtn';
import { ChatBubbleBottomCenterIcon, EyeIcon } from '@heroicons/react/24/outline';

interface LikeBtnProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
  userId: number;
  commentCount: number;
  views: number;
}

function LikeContainer({ isLiked, likeCount, postId, userId, commentCount, views }: LikeBtnProps) {
  return (
    <>
      <div className="flex justify-between items-center p-3 border-b-2 border-neutral-500 ">
        <LikeBtn isLiked={isLiked} likeCount={likeCount} userId={userId!} postId={postId} />
        <div className="flex items-center justify-center gap-3 *:text-neutral-500">
          <ChatBubbleBottomCenterIcon className="h-8" />
          <span>{commentCount}</span>
        </div>
        <div className="flex items-center justify-center gap-3 *:text-neutral-500">
          <EyeIcon className="h-8" />
          <span>{views}</span>
        </div>
      </div>
    </>
  );
}

export default LikeContainer;
