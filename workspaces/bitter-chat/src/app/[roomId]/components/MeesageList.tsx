import { IMessage, StylePropsComponent } from '@/app/types/common';
import { useContext, useEffect, useState } from 'react';
import { Message } from '@/app/[roomId]/components/Message';
import { RoomSocketContext } from '@/app/hooks/useRoomSocket';

export function MessageList({ className, roomId }: StylePropsComponent<any>) {
  const roomSocket = useContext(RoomSocketContext);
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
