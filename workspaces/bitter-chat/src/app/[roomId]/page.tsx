'use client';

import { MessageList } from '@/app/[roomId]/components/MeesageList';
import { Editor } from '@/app/[roomId]/components/Editor';
import { useContext } from 'react';
import { RoomSocketContext, useRoomSocket } from '@/app/hooks/useRoomSocket';
import { SocketContext } from '@/app/hooks/useSocket';

export default function Room({ params }: { params: { roomId: string } }) {
  const globalSocket = useContext(SocketContext);
  const socket = useRoomSocket(globalSocket, params.roomId);

  return (
    <RoomSocketContext.Provider value={socket}>
      <div className='tw-flex-1 tw-w-full tw-h-full tw-flex tw-flex-col'>
        <div className='tw-flex-1 tw-flex tw-flex-col-reverse tw-overflow-scroll'>
          <MessageList className='tw-flex-1' />
        </div>
        <div className='tw-h-11 tw-flex'>
          <Editor
            className=''
            roomId={params.roomId}
          />
        </div>
      </div>
    </RoomSocketContext.Provider>
  );
}
