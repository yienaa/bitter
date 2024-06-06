import { Context, createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketContext: Context<Socket | null> = createContext<Socket | null>(null);
export const SocketUrl = 'http://localhost:8000';

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  if (!socket) {
    console.error('소켓을 연결할꾸야아아아');

    const socketIo = io(SocketUrl);
    setSocket(socketIo);

    socketIo.onAny((event, ...args) => {
      switch (event) {
        case 'connect':
          console.log('connectedconnectedconnectedconnectedconnectedconnected');
          break;
        case 'room:createMsg':
          console.error(args);
          break;
        default:
          console.error(event, args);
          break;
      }
    });
  }

  return socket;
}
