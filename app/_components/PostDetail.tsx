import { getSessionId } from '@/lib/session';
import { notFound } from 'next/navigation';
import { getCachedComments, getCachedLikeStatus, getCachedPost, getCachedUser } from '../posts/[id]/_lib/cached';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import ImageBox from '../posts/[id]/_components/ImageBox';
import { formatToTimeAgo } from '@/lib/utils';
import LikeContainer from '../posts/[id]/_components/LikeContainer';
import CommentsContainer from '../posts/[id]/_components/CommentsContainer';
import DeleteChatContainer from '../posts/[id]/_components/DeleteChatContainer';

export default async function PostDetailContainer({ paramsId }: { paramsId: string }) {
  const id = Number(paramsId);
  const userId = await getSessionId();
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }
  const { likeCount, isLiked } = await getCachedLikeStatus(userId!, id);
  const loginUser = await getCachedUser(userId!);
  const comments = await getCachedComments(post.id);

  return (
    <>
      <div className="border-neutral-700 border-2 rounded-md ">
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center gap-2  ">
            <div className="size-10 overflow-hidden bg-neutral-100 rounded-full relative">{post.user.avatar ? <Image src={post.user.avatar} alt={post.user.username} fill className=" object-cover" /> : <UserIcon className="w-10 h-10 text-sky-400" />}</div>
            <div className="flex flex-col justify-center">
              <span className="text-lg font-semibold">{post.user.username}</span>
              <span className="text-neutral-400 text-sm font-semibold">{formatToTimeAgo(post.created_at.toString())}</span>
            </div>
          </div>
          <DeleteChatContainer postId={post.id} userId={userId!} postUserId={post.userId} photoImages={post.photo} />
        </div>
        <div className=" border-neutral-700 border-y-2">
          <ImageBox photos={JSON.parse(post.photo)} />
        </div>
        <div className="flex flex-col gap-2 p-3">
          <span className="font-bold text-2xl">{post.title}</span>
          <pre className=" whitespace-pre-line">{post.content}</pre>
        </div>
        <LikeContainer isLiked={isLiked} likeCount={likeCount} postId={id} userId={userId!} commentCount={comments.length} views={post.views} />
        <CommentsContainer postId={post.id} userId={userId!} user={loginUser!} comments={comments} />
      </div>
    </>
  );
}
