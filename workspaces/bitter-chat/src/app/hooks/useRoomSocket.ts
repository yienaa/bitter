import { createContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export const RoomSocketContext = createContext<Socket | null>(null);
export function useRoomSocket(globalSocket: Socket | null, roomId: string): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);
  const listener = (event: string, ...args: any[]) => {
    switch (event) {
      case 'room:createMsg':
        console.error(args);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!globalSocket) {
      return;
    }
    const socketIo = globalSocket;

    setSocket(socketIo);
    socketIo.emit('room:join', roomId);
    socketIo.on(roomId, listener);

    return () => {
      socketIo.emit('room:leave', roomId);
      socketIo.offAny(listener);
    };
  }, [roomId]);

  function emit(eventName: string, ...args: any[]) {
    if (socket) {
      socket.emit(eventName, roomId, ...args);
    }
  }

  return socket;
}
