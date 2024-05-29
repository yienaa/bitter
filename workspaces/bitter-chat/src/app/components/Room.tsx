import { IMessage } from '@/app/types/common';
import { useState } from 'react';
import { Message } from '@/app/components/Message';
import { Editor } from '@/app/components/Editor';

const test = [
  {
    id: 1,
    user: '홍길동1',
    message: '안녕하세욥!',
    time: '오후 2:30',
  },
  {
    id: 2,
    user: '홍길동2',
    message: '안녕하세용',
    time: '오후 2:30',
  },
];

export function Room({ className }: StylePropsComponent) {
  const [messageList, setMessageList] = useState<IMessage[]>(test);

  return (
    <div className={`${className} tw-w-full tw-h-full tw-flex tw-flex-col`}>
      <div className='tw-flex-1 tw-flex tw-flex-col-reverse'>
        {messageList.map((message) => (
          <Message
            key={message.id}
            {...message}
          />
        ))}
      </div>
      <Editor className='tw-min-h-16 tw-max-h-24' />
    </div>
  );
}
