import { IMessage, StylePropsComponent } from '@/app/types/common';
import { useState, useEffect } from 'react';
import { Message } from '@/app/[roomId]/components/Message';

export function MessageList({ className, roomId }: StylePropsComponent<any>) {
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  useEffect(() => {
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
