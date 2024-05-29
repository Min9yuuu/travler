import { z } from 'zod';

export const commentSchema = z.object({
  comment: z
    .string({
      required_error: `댓글을 적고 눌러주세요`,
    })
    .trim()
    .min(1, `한 글자 이상 적어주세요`)
    .max(100, '100글자 이상 적을 수 없습니다.'),
});

export type CommentType = z.infer<typeof commentSchema>;
