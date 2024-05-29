'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useState } from 'react';

export default function ImageBox({ photos }: { photos: string[] }) {
  SwiperCore.use([Pagination]);
  const [slideIndex, setSlideIndex] = useState(1);

  return (
    <>
      <div className="relative w-full h-full">
        {photos.length === 1 ? null : <div className="absolute z-10 right-2 top-2 rounded-full text-neutral-100 w-14 bg-neutral-600 text-center opacity-70">{`${slideIndex} / ${photos.length}`}</div>}
        <Swiper
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          watchOverflow={true}
          onActiveIndexChange={(e) => {
            setSlideIndex(e.realIndex + 1);
          }}
        >
          {photos.map((photo, idx) => (
            <SwiperSlide key={idx}>
              <div className="aspect-square flex items-center justify-center relative">
                <Image priority={true} src={`${photo}`} alt={photo} sizes="100" fill className="object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
