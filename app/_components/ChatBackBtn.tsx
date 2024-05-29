'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function ChatBackBtn() {
  const router = useRouter();

  const onClickBack = () => {
    router.push(`/chat`);
  };
  return (
    <>
      <div className="my-3 p-3">
        <div className="flex items-center gap-4">
          <button onClick={onClickBack}>
            <ArrowLeftIcon className=" size-10" />
          </button>
          <span className=" text-xl font-semibold">채팅</span>
        </div>
      </div>
    </>
  );
}
