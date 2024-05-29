'use client';

import { useEffect, useRef, useState } from 'react';
import { InitialChatMessages } from '../[id]/page';
import Image from 'next/image';
import { ArrowUpCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import { formatToTimeAgo } from '@/lib/utils';
import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import { saveMessage } from '../[id]/actions';
import BackBtn from '@/app/_components/BackBtn';

interface ChatMessageListProps {
  initialMessages: InitialChatMessages;
  userId: number;
  chatRoomId: string;
  username: string;
  avatar: string | null;
}

const SUPABASE_PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1eHdmZWFseWNzbGlxdm12ZXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwODgwMTgsImV4cCI6MjAzMDY2NDAxOH0._AQg6VDyoaHF7bPuzRFOwpcHYplQm-WHxfCCWkmtF5A';
const SUPABASE_URL = 'https://luxwfealycsliqvmvetr.supabase.co';

export default function ChatMessageList({ initialMessages, userId, chatRoomId, username, avatar }: ChatMessageListProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');
  const channel = useRef<RealtimeChannel>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setMessage(value);
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username: '',
          avatar: 'xxx',
        },
      },
    ]);
    channel.current?.send({
      type: 'broadcast',
      event: 'message',
      payload: {
        id: Date.now(),
        payload: message,
        create_at: new Date(),
        userId,
        user: {
          username,
          avatar,
        },
      },
    });
    await saveMessage(message, chatRoomId);
    setMessage('');
  };

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current.on('broadcast', { event: 'message' }, (payload) => setMessages((prevMessage) => [...prevMessage, payload.payload])).subscribe();
    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);
  return (
    <>
      <div className="pb-5 ml-5 flex flex-col min-h-screen justify-between">
        <BackBtn />
        <div className="flex flex-col gap-5">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 items-start ${message.userId === userId ? 'justify-end' : ''}`}>
              {message.userId === userId ? null : message.user.avatar ? <Image src={message.user.avatar} alt={message.user.username} /> : <UserIcon className="w-10 h-10 text-sky-400" />}
              <div className={`flex flex-col gap-1 ${message.userId === userId ? 'items-end' : ''}`}>
                <span className="bg-sky-400 p-2.5 rounded-md text-neutral-50 shadow-md">{message.payload}</span>
                <span className=" text-sm text-gray-400">{formatToTimeAgo(message.created_at.toString())}</span>
              </div>
            </div>
          ))}
          <form className="flex relative" onSubmit={onSubmit}>
            <input
              required
              onChange={onChange}
              value={message}
              className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-2 transition ring-neutral-200 focus:ring-sky-400 border-none placeholder:text-neutral-400"
              type="text"
              name="message"
              placeholder="메세지를 적어주세요"
            />
            <button className="absolute right-0">
              <ArrowUpCircleIcon className="size-10 text-sky-400 transition-colors hover:text-sky-300" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
