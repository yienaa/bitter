'use client';

import { MessageList } from '@/app/[roomId]/components/MeesageList';
import { Editor } from '@/app/[roomId]/components/Editor';
import { useContext, useEffect, useState } from 'react';
import { IMessage } from '@/app/types/common';
import { useRoomSocket } from '@/app/hooks/useRoomSocket';
import { SocketContext } from '@/app/hooks/useSocket';

export default function Room({ params }: { params: { roomId: string } }) {
  const globalSocket = useContext(SocketContext);
  const socket = useRoomSocket(globalSocket, params.roomId);
  const [roomId, setRoomId] = useState<string>('');
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  useEffect(() => {
    setRoomId(params.roomId);
  }, [params.roomId]);

  function createMessage() {
    const body = {
      roomId,
      user: '레나',
      message: '안녕하세요안뇨아아아아뇬뇨앙욘',
    };
    fetch('http://localhost:8000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then();
  }

  return (
    <div className='tw-flex-1 tw-w-full tw-h-full tw-flex tw-flex-col'>
      <div className='tw-flex-1 tw-flex tw-flex-col-reverse'>
        <MessageList className='tw-flex-1' />
      </div>
      <div className='tw-h-10 tw-flex'>
        <Editor className='' />
        <button
          className='tw-shrink-0 tw-w-18 tw-h-full tw-bg-blue-500 tw-text-white'
          onClick={createMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
}
