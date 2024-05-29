'use client';

import Image from 'next/image';
import { Toolbar } from '@/app/components/Toolbar';
import { RoomList } from '@/app/components/RoomList';
import { Room } from '@/app/components/Room';

export default function ChatHome() {
  return (
    <div className='tw-w-full tw-h-full tw-flex tw-flex-col tw-overflow-hidden'>
      <Toolbar />
      <section className='tw-h-full tw-flex'>
        <RoomList className='tw-border-r-2' />
        <Room className='tw-flex-1' />
      </section>
    </div>
  );
}
