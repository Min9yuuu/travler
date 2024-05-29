import HomeList from './_components/HomeList';
import { Prisma } from '@prisma/client';
import { getCachedInitialPost, getInitialPost } from './actions';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export type InitialPosts = Prisma.PromiseReturnType<typeof getInitialPost>;

export default async function Home() {
  const postTake = 3;
  const session = await getSession();
  const userId = session.id;
  const initialPosts = await getCachedInitialPost(postTake);
  return (
    <>
      <div>
        <HomeList initialPosts={initialPosts} userId={userId} take={postTake} />
      </div>
    </>
  );
}
