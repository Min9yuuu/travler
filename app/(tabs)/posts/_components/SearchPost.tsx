'use client';

import Link from 'next/link';
import { UserIcon, HeartIcon as SolidHeart } from '@heroicons/react/24/solid';
import { formatToTimeAgo } from '@/lib/utils';
import { FaImages } from 'react-icons/fa';
import Image from 'next/image';
import { HeartIcon as OutLineHeart, ChatBubbleBottomCenterIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { getCachedLikeStatus } from '@/app/posts/[id]/_lib/cached';

interface SearchPostProps {
  post: {
    id: number;
    user: {
      avatar: string | null;
      username: string;
    };
    created_at: Date;
    photo: string;
    title: string;
    content: string;
    _count: {
      comments: number;
    };
    views: number;
  };
  userId: number;
}

export default function SearchPost({ post, userId }: SearchPostProps) {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likeCount, setLikeCount] = useState<number>();
  useEffect(() => {
    async function getIsLiked() {
      const { likeCount, isLiked } = await getCachedLikeStatus(userId!, post.id);
      setIsLiked(isLiked);
      setLikeCount(likeCount);
    }
    getIsLiked();
  }, [isLiked]);

  return (
    <>
      <Link href={`/posts/${post.id}`}>
        <div className="border-2 border-neutral-700 rounded-md flex flex-col py-2">
          <div className="flex gap-1 px-2">
            <div className="size-8 overflow-hidden bg-neutral-100 rounded-full relative">{post.user.avatar ? <Image src={post.user.avatar} alt={post.user.username} className=" object-cover" fill /> : <UserIcon className="size-8 text-sky-400" />}</div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{post.user.username}</span>
              <span className=" text-xs">{formatToTimeAgo(post.created_at.toString())}</span>
            </div>
          </div>
          <div className="relative py-2">
            {JSON.parse(post.photo).length <= 1 ? null : <FaImages className="z-20 absolute text-neutral-400 size-6 rounded-md top-4 right-4" />}
            <div className="w-full h-60 text-neutral-700 aspect-square flex justify-center items-center relative border-neutral-700 border-y-2 z-10">
              <Image priority={true} src={`${JSON.parse(post.photo)[0]}`} alt={post.title} sizes="100" fill className="object-cover "></Image>
            </div>
          </div>
          <div className="px-2 pb-2">
            <span className="font-semibold text-base">{post.title}</span>
            <span className=" line-clamp-2 text-sm">{post.content}</span>
          </div>
          <div className="flex justify-between items-center px-2">
            <div className="flex gap-2">
              <span>{isLiked ? <SolidHeart className="size-6 text-red-500" /> : <OutLineHeart className="size-6 text-neutral-500" />}</span>
              <span>{likeCount}</span>
            </div>
            <div className="flex gap-2 *:text-neutral-500">
              <ChatBubbleBottomCenterIcon className="size-6" />
              <span>{post._count.comments}</span>
            </div>
            <div className="flex gap-2 *:text-neutral-500">
              <EyeIcon className="size-6" />
              <span>{post.views}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
