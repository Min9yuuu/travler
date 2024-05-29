'use client';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

import { useState } from 'react';

import { createChatRoom } from '@/app/chats/[id]/actions';
import DeleteChatBtn from './DeleteChatBtn';

interface PostDeleteProps {
  postId: number;
  userId: number;
  photoImages: string;
  postUserId: number;
}

export default function DeleteChatContainer({ postId, userId, photoImages, postUserId }: PostDeleteProps) {
  const [show, setShow] = useState(false);
  const isOwner = Boolean(userId === postUserId);
  const onSubmit = async (postUserId: number) => {
    return await createChatRoom(postUserId);
  };
  return (
    <>
      <div className="relative">
        <div
          className="p-2"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          <EllipsisHorizontalIcon className="size-7 cursor-pointer" />
        </div>
        {show ? (
          isOwner ? (
            <>
              <DeleteChatBtn postId={postId} userId={userId} photoImages={photoImages} />
            </>
          ) : (
            <form action={() => onSubmit(postUserId)} className="absolute p-1.5 right-1.5 z-20 flex flex-col items-center gap-2 bg-neutral-100 border-sky-400 border-4 rounded-md *:font-semibold *:text-center ">
              <button className="w-24 px-2 py-1">채팅하기</button>
            </form>
          )
        ) : null}
      </div>
    </>
  );
}
