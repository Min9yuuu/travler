'use server';

import db from '@/lib/db';
import { getSessionId } from '@/lib/session';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

// createChatroom

export async function createChatRoom(postUserId: number) {
  const userId = await getSessionId();
  const findRoom = await db.chatRoom.findMany({
    where: {
      AND: [{ users: { some: { id: postUserId } } }, { users: { some: { id: userId } } }],
    },
    select: {
      id: true,
    },
  });

  if (findRoom[0]) {
    redirect(`/chats/${findRoom[0].id}`);
  } else {
    const room = await db.chatRoom.create({
      data: {
        users: {
          connect: [
            {
              id: postUserId,
            },
            {
              id: userId,
            },
          ],
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/chats/${room.id}`);
  }
}

export async function saveMessage(payload: string, chatRoomId: string) {
  const userId = await getSessionId();
  const message = await db.message.create({
    data: {
      payload,
      chatRoomId,
      userId: userId!,
    },
    select: {
      id: true,
    },
  });
  revalidateTag('chat-rooms');
}
