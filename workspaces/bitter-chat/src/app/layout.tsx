'use client';

import './globals.css';
import { Toolbar } from '@/app/components/Toolbar';
import { RoomList } from '@/app/components/RoomList';
import { SocketContext, useSocket } from '@/app/hooks/useSocket';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socket = useSocket();
  return (
    <html lang='en'>
      <body>
        <SocketContext.Provider value={socket}>
          <div className='tw-w-full tw-h-full tw-flex tw-flex-col tw-overflow-hidden'>
            <Toolbar />
            <section className='tw-h-[calc(100%_-_3.5rem)] tw-flex'>
              <RoomList className='tw-border-r-2' />
              {children}
            </section>
          </div>
        </SocketContext.Provider>
      </body>
    </html>
  );
}
