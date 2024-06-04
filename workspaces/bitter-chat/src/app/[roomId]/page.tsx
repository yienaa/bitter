'use client';

import { MessageList } from '@/app/[roomId]/components/MeesageList';
import { Editor } from '@/app/[roomId]/components/Editor';
import { useSocket } from '@/app/hooks/useSocket';

export default function Room() {
  const socket = useSocket('http://localhost:8000');

  function createMessage() {
    const body = {
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
