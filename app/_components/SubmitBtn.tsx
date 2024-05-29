'use client';
import { useFormStatus } from 'react-dom';

interface BtnProps {
  text: string;
}

export default function SubmitBtn({ text }: BtnProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <button disabled={pending} className="w-full h-10 bg-sky-400 rounded-md text-white hover:bg-sky-500 transition-colors mt-3 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed">
        {pending ? '로딩중...' : text}
      </button>
    </>
  );
}
