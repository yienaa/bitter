import React, { useState } from 'react';
import { Toolbar } from '@/app/components/Toolbar';
import { IRoom, StylePropsComponent } from '@/app/types/common';

const test = [
  {
    id: 1,
    name: '홍길동1대화',
    recent: '안녕하세요',
    time: '오후 2:30',
  },
  {
    id: 2,
    name: '홍길동2대화',
    recent: '안녕하세요',
    time: '오후 2:30',
  },
  {
    id: 3,
    name: '홍길동3대화',
    recent: '안녕하세요',
    time: '오후 2:30',
  },
];

export function RoomList({ className }: StylePropsComponent) {
  const [chatList, setChatList] = useState<IRoom[]>(test);
  return (
    <div className={`${className} tw-h-full`}>
      <ul className=''>
        {chatList.map((chat) => (
          <RoomItem
            key={chat.id}
            {...chat}
          />
        ))}
      </ul>
    </div>
  );
}

function RoomItem({ recent, time, name }: IRoom) {
  return (
    <li className='tw-p-4 tw-border-b tw-border-gray-200'>
      <div className='tw-flex tw-justify-between tw-items-center'>
        <div>
          <p className='tw-text-lg tw-font-bold'>{name}</p>
          <p className='tw-text-sm tw-text-gray-500'>{recent}</p>
        </div>
        <div>
          <p className='tw-text-sm tw-text-gray-500'>{time}</p>
        </div>
      </div>
    </li>
  );
}
