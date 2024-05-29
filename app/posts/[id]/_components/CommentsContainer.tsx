import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import CommentInput from './CommentInput';

export interface CommentProps {
  comments: {
    id: number;
    postId: number;
    userId: number;
    user: {
      username: string;
      avatar: string | null;
    };
    comment: string;
    created_at: Date;
  }[];
  postId: number;
  userId: number;
  user: {
    username?: string;
    avatar?: string | null;
  };
}

function CommentsContainer({ postId, userId, user, comments }: CommentProps) {
  return (
    <div className=" border-neutral-700 p-4">
      <CommentInput postId={postId} userId={userId!} user={user} comments={comments} />
    </div>
  );
}

export default CommentsContainer;
