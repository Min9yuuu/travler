'use client';

import SubmitBtn from '../_components/SubmitBtn';
import { useState } from 'react';
import { PostType, postSchema } from './scheam';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getUploadUrl, uploadProduct } from './actions';
import ContentInput from '../_components/ContentInput';
import ContentTextarea from '../_components/ContentTextarea';
import Previews from '../_components/Previews';
import BackBtn from '@/app/_components/BackBtn';

export default function AddPost() {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<PostType>({
    resolver: zodResolver(postSchema),
  });
  // file 저장 배열
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadUrl, setUploadUrl] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  // change event
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) {
      return;
    }
    const file = files[0];
    if (10 > imageFiles.length || imageFiles.length > 0) {
      const url = URL.createObjectURL(file);
      setPreviews((prev) => [...prev, url]);
      setImageFiles((prev) => [...prev, file]);
    } else {
      alert('더 이상 올릴 수 없습니다.');
    }
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl((prev) => [...prev, uploadURL]);
      const photoUrl = `https://imagedelivery.net/Y_UKM5L5vAuGD_inZRQCWA/${id}/smaller`;
      setValue('photo', photoUrl);
      setImgUrl((prev) => [...prev, photoUrl]);
    }
  };

  // delete photo
  const deletePreviews = (idx: number) => {
    const newImages = [...imageFiles];
    const newPreviews = [...previews];
    const newUploadUrl = [...uploadUrl];
    const newImgUrl = [...imgUrl!];

    const revokePreview = newPreviews.splice(idx, 1);
    newImages.splice(idx, 1);
    newUploadUrl.splice(idx, 1);
    newImgUrl.splice(idx, 1);
    URL.revokeObjectURL(revokePreview[0]);

    setImageFiles(newImages);
    setPreviews(newPreviews);
    setUploadUrl(newUploadUrl);
    setImgUrl(newImgUrl);
  };
  // reset photo
  const resetFile = () => {
    const newPreviews = [...previews];
    for (let i = 0; i < newPreviews.length; i++) {
      URL.revokeObjectURL(newPreviews[i]);
    }
    setImageFiles([]);
    setPreviews([]);
    setImgUrl([]);
  };

  const onSubmit = handleSubmit(async (data: PostType) => {
    const file = imageFiles;
    if (file.length === 0) {
      return;
    }

    for (let i = 0; i < file.length; i++) {
      const cloudflareForm = new FormData();
      cloudflareForm.append('file', file[i]);
      const response = await fetch(uploadUrl[i], {
        method: 'post',
        body: cloudflareForm,
      });
      if (response.status !== 200) {
        return;
      }
    }

    const postUrl = JSON.stringify(imgUrl);
    const formData = new FormData();

    formData.append('photo', postUrl);
    formData.append('title', data.title);
    formData.append('content', data.content);

    return uploadProduct(formData);
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <>
      <div className="w-full px-5 mb-3">
        <BackBtn />
        <form action={onValid} className="flex flex-col gap-5">
          <Previews previews={previews} deletePreviews={deletePreviews} errors={[errors.photo?.message ?? '']} />
          <input onChange={handleImageChange} type="file" id="photo" name="photo" accept="image/*" className="hidden" />
          <ContentInput {...register('title')} required placeholder="제목을 입력해주세요" type="text" errors={[errors.title?.message ?? '']} />
          <ContentTextarea {...register('content')} required placeholder="당신의 여행을 적어주세요." errors={[errors.content?.message ?? '']} />
          <SubmitBtn text="글쓰기" />
          <button type="reset" onClick={() => resetFile()} className="w-full h-10 bg-sky-400 rounded-md text-white hover:bg-sky-500 transition-colors">
            리셋
          </button>
        </form>
      </div>
    </>
  );
}
