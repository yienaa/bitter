import { Context, createContext, RefObject, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketContext: Context<Socket | null> = createContext<Socket | null>(null);
export const SocketUrl = 'http://localhost:8000';

export function useSocket() {
  const socket = useRef<Socket>(null);

  useEffect(() => {
    // 소켓을 useEffect 내에서 초기화
    socket.current = io(SocketUrl, {
      autoConnect: false,
    });

    socket.current.connect(); // 명시적으로 연결을 시작

    socket.current.onAny((event, ...args) => {
      switch (event) {
        case 'init':
          console.log(event, 'connectedconnectedconnectedconnectedconnectedconnected');
          break;
        case 'room:createMsg':
          console.error(args);
          break;
        default:
          console.error(event, args);
          break;
      }
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return socket;
}
