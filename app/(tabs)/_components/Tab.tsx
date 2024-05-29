'use client';

import Link from 'next/link';
import { HomeIcon as SolidHomeIcon, StarIcon as SolidStarIcon, ChatBubbleBottomCenterIcon as SolidChatIcon, UserIcon as SolidUserIcon, PlusIcon } from '@heroicons/react/24/solid';
import { HomeIcon as OutlineHomeIcon, StarIcon as OutlineStarIcon, ChatBubbleBottomCenterIcon as OutlineChatIcon, UserIcon as OutlineUserIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { IoAirplane, IoAirplaneOutline } from 'react-icons/io5';

export default function TabBar() {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed bottom-0 max-w-screen-sm w-full mx-auto grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800 z-40">
        <Link href="/home" className="flex items-center justify-center">
          {pathname === '/home' ? <SolidHomeIcon className="w-10 h-10" /> : <OutlineHomeIcon className="w-10 h-10 " />}
        </Link>
        <Link href="/posts" className="flex items-center justify-center">
          {pathname === '/posts' ? <IoAirplane className="w-10 h-10" /> : <IoAirplaneOutline className="w-10 h-10" />}
        </Link>

        <Link href="/add" className="flex items-center justify-center">
          <div className="w-10 h-10 bg-sky-400 rounded-full">
            <PlusIcon />
          </div>
        </Link>
        <Link href="/chat" className="flex items-center justify-center">
          {pathname === '/chat' ? <SolidChatIcon className="w-10 h-10" /> : <OutlineChatIcon className="w-10 h-10" />}
        </Link>
        <Link href="/mypage" className="flex items-center justify-center">
          {pathname === '/mypage' ? <SolidUserIcon className="w-10 h-10" /> : <OutlineUserIcon className="w-10 h-10" />}
        </Link>
      </div>
    </>
  );
}
