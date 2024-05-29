import db from '@/lib/db';
import { getSessionId } from '@/lib/session';
import { formatToTimeAgo } from '@/lib/utils';
import { UserIcon } from '@heroicons/react/24/solid';
import { unstable_cache } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';

async function getAllChatRoom(id: number) {
  const room = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id,
        },
      },
    },
    include: {
      users: {
        where: {
          NOT: {
            id,
          },
        },
      },
      messages: {
        select: {
          payload: true,
          id: true,
          created_at: true,
          user: true,
        },
      },
    },
  });

  return room;
}

const getCachedInitialChat = unstable_cache(getAllChatRoom, ['chat-init-room'], {
  tags: ['chat-rooms'],
  revalidate: 60,
});

export default async function Chats() {
  const userId = await getSessionId();
  const rooms = await getCachedInitialChat(userId!);

  return (
    <>
      <div className="p-5 flex flex-col justify-center items-center gap-3 ">
        {rooms.map((room) => (
          <Link key={room.id} href={`/chats/${room.id}`} className="w-full ">
            <div className="w-full h-20 flex justify-between rounded-md p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="size-10 overflow-hidden bg-neutral-100 rounded-full relative">{room.users[0].avatar ? <Image src={room.users[0].avatar} alt={room.users[0].username} fill className="object-cover" /> : <UserIcon className="w-10 h-10 text-sky-400" />}</div>
                <div className="flex flex-col">
                  <span className="font-semibold">{room.users[0].username}</span>
                  <span>{room.messages[room.messages.length - 1].payload ?? '채팅이 없습니다.'}</span>
                </div>
              </div>
              <div className="text-neutral-400">{formatToTimeAgo(room.messages[room.messages.length - 1].created_at.toString())}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
