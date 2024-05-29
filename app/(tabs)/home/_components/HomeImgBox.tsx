'use client';
import Image from 'next/image';
import { FaImages } from 'react-icons/fa';

export default function HomeImgBox({ imgSrc, imgTitle }: { imgSrc: string; imgTitle: string }) {
  return (
    <>
      {
        <div className="relative">
          {JSON.parse(imgSrc).length <= 1 ? null : <FaImages className="z-10 absolute text-neutral-400 size-9 rounded-md top-4 right-4" />}
          <div className="w-full text-neutral-700 aspect-square flex justify-center items-center relative border-neutral-700 border-y-2">
            <Image priority={true} src={`${JSON.parse(imgSrc)[0]}`} alt={imgTitle} sizes="100" fill className="object-cover "></Image>
          </div>
        </div>
      }
    </>
  );
}
