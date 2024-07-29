import { Context, createContext, RefObject, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketContext: Context<Socket | null> = createContext<Socket | null>(null);
export const SocketUrl = 'http://localhost:8000';

export function useSocket() {
  const [socket, setSocket] = useState<Socket>(() =>
    io(SocketUrl, {
      autoConnect: false,
    }),
  );

  useEffect(() => {
    // 소켓을 useEffect 내에서 초기화
    if (socket) {
      socket.connect(); // 명시적으로 연결을 시작

      socket.onAny((event, ...args) => {
        switch (event) {
          default:
            console.log(event, args);
            break;
        }
      });
    }
    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return socket;
}
