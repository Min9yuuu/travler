import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function LogoutBtn() {
  const logOut = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };
  return (
    <>
      <form action={logOut} className="w-full">
        <button className="p-2 bg-red-500 w-full rounded-md text-white font-medium">로그아웃</button>
      </form>
    </>
  );
}
