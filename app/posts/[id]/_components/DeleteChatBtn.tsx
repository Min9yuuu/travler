import React, { useState } from 'react';
import { delPost, deleteUrl } from '../actions';
import { useRouter } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import Link from 'next/link';

interface DeleteProps {
  postId: number;
  userId: number;
  photoImages: string;
}

function DeleteChatBtn({ postId, userId, photoImages }: DeleteProps) {
  const router = useRouter();
  const [imgId, setImgId] = useState<string[]>([]);
  const [delUrlRes, setDelUrlRes] = useState<boolean[]>([]);
  const imgs = JSON.parse(photoImages);
  const deletePost = async () => {
    for (let i = 0; i < imgs.length; i++) {
      if (i == 0) {
        const imgQuery = imgs[i].split('/');
        setImgId([imgQuery[imgQuery.length - 1]]);
      } else {
        const imgQuery = imgs[i].split('/');
        setImgId((prev) => [...prev, imgQuery[imgQuery.length - 1]]);
      }
    }
    imgId.forEach(async (id) => {
      const { success } = await deleteUrl(id);
      setDelUrlRes((prev) => [...prev, success]);
    });
    const successDelUrls = delUrlRes.every((success) => success);
    if (successDelUrls) {
      const res = await delPost(postId, userId);
      if (res) {
        alert('삭제되었습니다.');
        router.replace('/home');
      } else {
        alert('실패했습니다.');
      }
    }
  };

  return (
    <>
      <div className="absolute p-1.5 right-1.5 z-20 flex flex-col items-center gap-2 bg-neutral-100 border-sky-400 border-4 rounded-md *:font-semibold *:text-center ">
        <Link href={`/posts/${postId}/postupdate`} className="w-24 px-2 py-1">
          수정하기
        </Link>
        <button onClick={deletePost} className="w-24 px-2 py-1 cursor-pointer">
          삭제
        </button>
      </div>
    </>
  );
}
export default React.memo(DeleteChatBtn);
