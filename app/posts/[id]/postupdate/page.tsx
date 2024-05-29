import { notFound } from 'next/navigation';
import { getPost } from '../_lib/cached';
import UpdateContainer from './_components/UpdateForm';
import { Prisma } from '@prisma/client';
import BackBtn from '@/app/_components/BackBtn';

export type PostUpdateType = Prisma.PromiseReturnType<typeof getPost>;

export default async function ProductModify({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getPost(id);
  if (!post) {
    return notFound();
  }
  return (
    <>
      <div className="w-full px-5 mb-3">
        <BackBtn />
        <UpdateContainer post={post!} />
      </div>
    </>
  );
}
