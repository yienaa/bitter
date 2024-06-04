import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(url);
    setSocket(socketIo);

    socketIo.onAny((event, ...args) => {
      switch (event) {
        case 'connect':
          console.log('connected');
          break;
        case 'message:create':
          console.error(args);
          break;
        default:
          break;
      }
    });

    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  return socket;
}
