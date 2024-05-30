import { IMessage } from '@/app/types/common';
import { useState, useEffect } from 'react';
import { Message } from '@/app/components/Message';
import { Editor } from '@/app/components/Editor';

export function Room({ className }: StylePropsComponent) {
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  useEffect(() => {
    fetch(' http://localhost:8000/api/messages')
      .then((res) => res.json())
      .then((data) => setMessageList(data.reverse()));
  }, []);

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
