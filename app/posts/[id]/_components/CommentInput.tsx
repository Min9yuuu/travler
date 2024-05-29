'use client';

import { useOptimistic, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CommentType, commentSchema } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentProps } from './CommentsContainer';
import { delComment, setComment } from '../actions';
import { formatToTimeAgo } from '@/lib/utils';
import { ArrowUpCircleIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface commentType {
  id: number;
  postId: number;
  userId: number;
  user: {
    username: string;
    avatar: string | null;
  };
  comment: string;
  created_at: Date;
}

export default function CommentInput({ postId, userId, user, comments }: CommentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentType>({
    resolver: zodResolver(commentSchema),
  });
  const [state, reducerFn] = useOptimistic(comments, (prevState, payload: commentType[]) => comments.filter((item) => (item.id ? [...payload] : [...prevState, ...payload])));
  const onSubmit = handleSubmit(async (data: CommentType) => {
    if (!data) {
      return;
    }
    const newComment = [
      {
        id: 1,
        postId: postId,
        userId: userId as number,
        user: {
          username: user.username as string,
          avatar: user.avatar as string | null,
        },
        comment: data.comment,
        created_at: new Date(),
      },
    ];
    reducerFn(newComment);
    const formData = new FormData();
    formData.append('comment', data.comment);
    return setComment(formData, userId, postId);
  });
  const onValid = async () => {
    onSubmit();
  };
  const onClick = async (idx: number, id: number) => {
    const delComments = state.splice(idx, 1);
    reducerFn(delComments);
    await delComment(postId, userId, id);
  };

  return (
    <>
      <form action={onValid} onSubmit={(e) => e.currentTarget.reset()} className="relative mb-3">
        <input {...register('comment')} type="text" className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-2 transition ring-neutral-200 focus:ring-sky-400 border-none placeholder:text-neutral-400" />
        <button className=" absolute right-1">
          <ArrowUpCircleIcon className="size-10 text-sky-400 transition-colors hover:text-sky-300" />
        </button>
      </form>
      {errors ? <span className="text-red-500">{errors.comment?.message}</span> : null}
      {state.length === 0 ? (
        <>
          <div className="flex items-center flex-col gap-2 p-2 border-2 bg-neutral-400 border-neutral-500 rounded-md mt-2 *:text-neutral-800">
            <span className="text-lg font-bold ">아직 댓글이 없습니다</span>
            <span className="text-sm font-semibold">댓글을 달아주세요</span>
          </div>
        </>
      ) : (
        state.map((comment, idx) => (
          <div key={idx} className="flex justify-between gap-2 p-2 border-2 border-neutral-500 rounded-md mt-2">
            <div className="flex items-center ">
              <div className="w-10 h-10 overflow-hidden bg-neutral-100 rounded-full">{comment.user.avatar ? <Image src={comment.user.avatar} alt={comment.user.username} className=" object-cover" /> : <UserIcon className="w-10 h-10 text-sky-400" />}</div>
              <div className="flex flex-col">
                <span>
                  {comment.user.username} • {formatToTimeAgo(comment.created_at.toString())}
                </span>
                <span>{comment.comment}</span>
              </div>
            </div>
            <div>{comment.userId === userId ? <XMarkIcon className="size-7" onClick={() => onClick(idx, comment.id)} /> : null}</div>
          </div>
        ))
      )}
    </>
  );
}
