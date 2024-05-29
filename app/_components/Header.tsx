'use client';

import Link from 'next/link';
import travlerLogo from '@/public/logo.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [path, setPath] = useState(false);
  const [logoOpecity, setLogoOpecity] = useState(false);
  const pathname = usePathname();
  const visibleLogo = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (pathname !== '/' || '/signup' || '/login') {
      setPath(true);
    } else {
      setPath(false);
    }
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (target === visibleLogo.current) {
            setLogoOpecity(isIntersecting);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );
    if (visibleLogo.current) {
      observer.observe(visibleLogo.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <div className={`flex px-3 bg-gray-100 z-20  w-full py-3 mx-auto ${path ? ' sticky -top-20 ' : ''} `}>
        <Link href="/" ref={visibleLogo} className={`${path ? `transition-opacity duration-500 ${logoOpecity ? ' pointer-events-auto opacity-100' : ' pointer-events-none opacity-0'}` : ''}`}>
          <div>
            <Image src={travlerLogo} alt="로고" className="w-60 -ml-2 object-cover" priority={true} />
          </div>
        </Link>
      </div>
    </>
  );
}
