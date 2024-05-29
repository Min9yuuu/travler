import db from '@/lib/db';
import LogoutBtn from './_components/LogoutBtn';
import { getSessionId } from '@/lib/session';
import Image from 'next/image';
import { PlusCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import AvatarChangeBtn from './_components/AvatarBtn';

export async function getUser(userId: number) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

export default async function MyPage() {
  const userId = await getSessionId();
  const user = await getUser(userId!);
  return (
    <>
      <div className="p-5 max-w-screen-sm flex flex-col items-center gap-2">
        <AvatarChangeBtn>{user?.avatar ? <Image src={user.avatar} alt={user.username} fill className="object-cover rounded-full " /> : <UserIcon className="text-sky-400" />}</AvatarChangeBtn>
        <span className="font-semibold text-2xl">{user?.username}</span>
        <span className="font-semibold text-2xl">{user?.email}</span>
        <LogoutBtn />
      </div>
    </>
  );
}
