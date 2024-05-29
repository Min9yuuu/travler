'use client';

import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function AvatarChangeBtn({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
      <div className=" size-52 bg-neutral-100 rounded-full relative">
        <PlusCircleIcon
          className="size-8 absolute right-0 text-sky-400 cursor-pointer"
          onClick={() => {
            router.push('/mypage/update-avatar');
          }}
        />
        {children}
      </div>
    </>
  );
}
