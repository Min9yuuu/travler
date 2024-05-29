'use client';

import { getUploadUrl } from '@/app/add/actions';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { updateAvatar } from '../update-avatar/actions';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitBtn from '@/app/_components/SubmitBtn';
import { useRouter } from 'next/navigation';

interface AvatarProps {
  id: number;
  avatar: string | null;
}

export default function AvatarForm({ id, avatar }: AvatarProps) {
  const [preview, setPreview] = useState('');
  const [uploadAvatar, setUploadAvatar] = useState('');
  const [avatarId, setAvatarId] = useState('');
  const router = useRouter();

  const onChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadAvatar(uploadURL);
      setAvatarId(id);
    }
  };
  const avatarChangeAction = async (_: any, formData: FormData) => {
    const file = formData.get('avatar');

    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append('file', file);
    const response = await fetch(uploadAvatar, {
      method: 'post',
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }
    const avatarUrl = `https://imagedelivery.net/Y_UKM5L5vAuGD_inZRQCWA/${avatarId}/smaller`;
    formData.set('avatar', avatarUrl);
    return updateAvatar(_, formData);
  };
  const [state, dispatch] = useFormState(avatarChangeAction, null);
  return (
    <>
      <div>
        <form action={dispatch} className="flex flex-col items-center justify-center py-5 w-full gap-6">
          {preview ? (
            <>
              <label htmlFor="avatar" className="border-2 p-32  flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-full border-dashed cursor-pointer bg-center bg-cover" style={{ backgroundImage: `url(${preview})` }}></label>
            </>
          ) : (
            <>
              <label htmlFor="avatar" className="border-2 aspect-square p-32  flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover">
                <PhotoIcon className="w-20" />
                <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
              </label>
            </>
          )}
          <input type="file" id="avatar" name="avatar" accept="image/*" className="hidden" onChange={onChangeAvatar} />
          {state?.fieldErrors.avatar ? <span>{state.fieldErrors.avatar}</span> : null}
          <SubmitBtn text="이미지 변경하기" />
        </form>
        <button
          className="w-full p-2 bg-red-500 rounded-md text-white font-semibold"
          onClick={() => {
            router.back();
          }}
        >
          취소
        </button>
      </div>
    </>
  );
}
