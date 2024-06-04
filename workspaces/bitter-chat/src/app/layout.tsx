'use client';

import './globals.css';
import { Toolbar } from '@/app/components/Toolbar';
import { RoomList } from '@/app/components/RoomList';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <div className='tw-w-full tw-h-full tw-flex tw-flex-col tw-overflow-hidden'>
          <Toolbar />
          <section className='tw-h-full tw-flex'>
            <RoomList className='tw-border-r-2' />
            {children}
          </section>
        </div>
      </body>
    </html>
  );
}
