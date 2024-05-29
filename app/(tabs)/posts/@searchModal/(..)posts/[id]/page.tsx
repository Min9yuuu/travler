import CloseBtn from '@/app/_components/CloseBtn';
import PostDetailContainer from '@/app/_components/PostDetail';

export default function PostsIRoute({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <div className="absolute bg-neutral-600 w-full min-h-screen top-0 left-0 bg-opacity-60 z-30 flex items-center">
        <div className=" absolute top-0 right-0 cursor-pointer">
          <CloseBtn />
        </div>
        <div className="max-w-screen-sm bg-white mx-auto rounded-md">
          <PostDetailContainer paramsId={id} />
        </div>
      </div>
    </>
  );
}
