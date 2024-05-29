import BackBtn from '@/app/_components/BackBtn';
import PostDetailContainer from '@/app/_components/PostDetail';

export default function PostDetail({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <div className="flex flex-col w-full px-5 mb-3 ">
        <BackBtn />
        <PostDetailContainer paramsId={id} />
      </div>
    </>
  );
}
