import Image from 'next/image';
import Link from 'next/link';
import travlerLogo from '../public/logo.png';

export default function Home() {
  console.log('home');

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6  ">
      <div className="my-auto flex flex-col items-center gap-2">
        <Image src={travlerLogo} alt="로고" className="object-cover" />
        <h1 className=" text-3xl sm:text-4xl font-medium mb-4">당신의 여행을 공유해주세요</h1>
        <Link href="/signup" className="w-full bg-sky-400 text-white text-center text-lg py-2.5 rounded-md hover:bg-sky-500 transition-colors mt-6">
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있으신가요?</span>
          <Link href="/login" className=" text-sky-500 hover:underline hover:underline-offset-3">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
