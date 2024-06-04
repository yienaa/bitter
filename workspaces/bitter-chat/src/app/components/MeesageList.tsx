import { IMessage, StylePropsComponent } from '@/app/types/common';
import { useState, useEffect } from 'react';
import { Message } from '@/app/components/Message';
import { Editor } from '@/app/components/Editor';

export function MessageList({ className, roomId }: StylePropsComponent<any>) {
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  useEffect(() => {
    console.error(123123);
    fetch(' http://localhost:8000/api/messages')
      .then((res) => res.json())
      .then((data) => setMessageList(data.reverse()));
  }, [roomId]);

  return (
    <>
      {messageList.map((message) => (
        <Message
          key={message.id}
          {...message}
        />
      ))}
    </>
  );
}
