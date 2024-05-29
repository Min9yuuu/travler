import db from '@/lib/db';
import { getSessionId } from '@/lib/session';
import { Prisma } from '@prisma/client';
import { notFound } from 'next/navigation';
import ChatMessageList from '../_components/Chat-messages-list';

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: { id: true },
      },
    },
  });
  if (room) {
    const userId = await getSessionId();
    const chatMember = Boolean(room.users.find((user) => user.id === userId));
    if (!chatMember) {
      return null;
    }
  }
  return room;
}

async function getMessage(chatRoomId: string) {
  const messages = await db.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return messages;
}

async function getUserProfile(userId: number) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  return user;
}

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessage>;

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);
  if (!room) {
    return notFound();
  }
  const initialMessages = await getMessage(params.id);
  const userId = await getSessionId();
  const user = await getUserProfile(userId!);
  if (!user) {
    return notFound();
  }
  return (
    <>
      <ChatMessageList chatRoomId={params.id} initialMessages={initialMessages} userId={userId!} username={user.username} avatar={user.avatar} />
    </>
  );
}
