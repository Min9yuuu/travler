import { z } from 'zod';

export const postSchema = z.object({
  photo: z.string({
    required_error: '사진을 한장이상 넣어주세요',
  }),
  title: z
    .string({
      required_error: '제목을 적어주세요.',
    })
    .min(2, '제목은 2글자 이상이어야 합니다.'),
  content: z
    .string({
      required_error: '내용을 적어주세요.',
    })
    .min(10, '10자 이상 적어주세요')
    .max(1000, '1000자 이상 적을 수 없습니다.'),
});

export type PostType = z.infer<typeof postSchema>;
