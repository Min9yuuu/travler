'use client';

import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function SearchForm() {
  const [searchValue, setSearchValue] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <div className="flex justify-between">
        <input
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key == 'Enter') {
              searchValue !== '' ? router.push(`${pathname}?${createQueryString('travle', searchValue)}`) : null;
            }
          }}
          className={`relative bg-transparent rounded-full w-full h-10 focus:outline-none ring-1 focus:ring-2 transition ring-neutral-200 focus:ring-sky-500 border-none placeholder:text-neutral-400 mt-1  ${searchValue !== '' ? 'w-11/12' : null} `}
        />
        <button
          onClick={() => {
            searchValue !== '' ? router.push(`${pathname}?${createQueryString('travle', searchValue)}`) : null;
          }}
          className={`absolute top-1 ${searchValue !== '' ? 'right-16' : 'right-3'}`}
        >
          <ArrowUpCircleIcon className="size-10 text-sky-400 transition-colors hover:text-sky-300" />
        </button>
        {searchValue !== '' ? (
          <button
            className="w-14 font-semibold"
            onClick={() => {
              setSearchValue('');
            }}
          >
            취소
          </button>
        ) : null}
      </div>
    </>
  );
}
