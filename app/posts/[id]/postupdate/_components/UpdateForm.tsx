'use client';

import { useEffect, useState } from 'react';
import { PostUpdateType } from '../page';
import { XMarkIcon } from '@heroicons/react/24/solid';
import SubmitBtn from '@/app/_components/SubmitBtn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostType, postSchema } from '@/app/add/scheam';
import ContentInput from '@/app/_components/ContentInput';
import ContentTextarea from '@/app/_components/ContentTextarea';
import { getUploadUrl } from '@/app/add/actions';
import { updatePost } from '../actions';
import Previews from '@/app/_components/Previews';

export default function UpdateContainer({ post }: { post: PostUpdateType }) {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<PostType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title,
      content: post?.content,
    },
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [uploadUrl, setUploadUrl] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const postImgUrl = JSON.parse(post!.photo);
    setImgUrl(postImgUrl);
    setPreviews(postImgUrl);
    setValue('photo', JSON.stringify(imgUrl));
  }, []);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) {
      return;
    }
    const file = files[0];

    if (10 > imgUrl.length + imageFiles.length || imgUrl.length + imageFiles.length > 0) {
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
      setImgUrl((prev) => [...prev, photoUrl]);
      setValue('photo', JSON.stringify(imgUrl));
    }
  };

  const deletePreviews = (idx: number) => {
    const newImagesFile = [...imageFiles];
    const newPreviews = [...previews];
    const newUploadUrl = [...uploadUrl];
    const newImgUrl = [...imgUrl!];
    const revokePreview = newPreviews.splice(idx, 1);

    if (imgUrl.length <= idx + 1) {
      newImagesFile.splice(idx - (imgUrl.length - 1), 1);
      newUploadUrl.splice(idx - (imgUrl.length - 1), 1);
    }
    newImgUrl.splice(idx, 1);
    URL.revokeObjectURL(revokePreview[0]);

    setImageFiles(newImagesFile);
    setPreviews(newPreviews);
    setUploadUrl(newUploadUrl);
    setImgUrl(newImgUrl);
  };

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
    if (imgUrl.length === 0) {
      return;
    }

    const file = imageFiles;

    if (file.length !== 0) {
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
    }

    const postUrl = JSON.stringify(imgUrl);
    const formData = new FormData();

    formData.append('photo', postUrl);
    formData.append('title', data.title);
    formData.append('content', data.content);

    return updatePost(formData, post!.id);
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <>
      <div>
        <form action={onValid} className="flex flex-col gap-5">
          <Previews previews={previews} deletePreviews={deletePreviews} errors={[errors.photo?.message ?? '']} />
          <input onChange={handleImageChange} type="file" id="photo" name="photo" accept="image/*" className="hidden" />
          <ContentInput {...register('title')} required placeholder="제목을 입력해주세요" type="text" errors={[errors.title?.message ?? '']} />
          <ContentTextarea {...register('content')} required placeholder="당신의 여행을 적어주세요." errors={[errors.content?.message ?? '']} />
          <SubmitBtn text="수정하기" />
          <button type="reset" onClick={() => resetFile()} className="w-full h-10 bg-sky-400 rounded-md text-white hover:bg-sky-500 transition-colors">
            리셋
          </button>
        </form>
      </div>
    </>
  );
}
