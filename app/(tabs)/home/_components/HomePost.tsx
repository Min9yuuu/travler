import { ChatBubbleBottomCenterIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon, UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import HomeImgBox from './HomeImgBox';
import { formatToTimeAgo } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCachedLikeStatus } from '@/app/posts/[id]/_lib/cached';

interface PostProps {
  id: number;
  photo: string;
  title: string;
  content: string;
  views: number;
  created_at: Date;
  user: {
    username: string;
    avatar: string | null;
  };
  _count: {
    comments: number;
  };
  userId?: number;
}
export default function HomePost({ id, photo, title, content, views, created_at, user: { username, avatar }, userId, _count: { comments } }: PostProps) {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likeCount, setLikeCount] = useState<number>();
  useEffect(() => {
    async function getIsLiked() {
      const { likeCount, isLiked } = await getCachedLikeStatus(userId!, id);
      setIsLiked(isLiked);
      setLikeCount(likeCount);
    }
    getIsLiked();
  }, [isLiked]);
  return (
    <>
      <div key={id} className="border-2 w-full border-neutral-700 rounded-md">
        <Link href={`/home/${id}`}>
          <div className="flex items-center gap-2 p-3">
            <div className="size-10 overflow-hidden bg-neutral-100 rounded-full relative">{avatar ? <Image src={avatar} alt={username} className=" object-cover" priority={true} fill /> : <UserIcon className="size-10 text-sky-400" />}</div>
            <div className="flex flex-col justify-center">
              <span className="text-lg font-semibold">{username}</span>
              <span className="text-neutral-400 text-sm font-semibold">{formatToTimeAgo(created_at.toString())}</span>
            </div>
          </div>
          <HomeImgBox imgSrc={photo} imgTitle={title} />
          <div>
            <div className="flex flex-col gap-2 p-3">
              <span className="font-bold text-2xl">{title}</span>
              <pre className=" line-clamp-2">{content}</pre>
            </div>
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center justify-center gap-3">
                {isLiked ? <SolidHeartIcon className="h-8 text-red-500" /> : <HeartIcon className="h-8 text-neutral-500" />}
                <span className="text-neutral-500">{likeCount}</span>
              </div>
              <div className="flex items-center justify-center gap-3 *:text-neutral-500 ">
                <ChatBubbleBottomCenterIcon className="h-8 " />
                <span>{comments}</span>
              </div>
              <div className="flex items-center justify-center gap-3 *:text-neutral-500">
                <EyeIcon className="h-8 " />
                <span>{views}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
