'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function CloseBtn() {
  const router = useRouter();
  return (
    <>
      <XMarkIcon
        onClick={() => {
          router.back();
        }}
        className="size-10 absolute top-0 right-0 cursor-pointer"
      />
    </>
  );
}
