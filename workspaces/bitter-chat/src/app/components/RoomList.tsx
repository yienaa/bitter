import React, { useEffect, useState } from 'react';
import { IRoom, StylePropsComponent } from '@/app/types/common';
import Link from 'next/link';
import BitterDate from '@/app/utils/date';

export function RoomList({ className }: StylePropsComponent<null>) {
  const [chatList, setChatList] = useState<IRoom[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/room')
      .then((res) => res.json())
      .then((data) => setChatList(data.reverse()));
  }, []);

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

function RoomItem({ recent, time, name, id }: IRoom) {
  return (
    <Link href={`/${id}`}>
      <li className='tw-p-4 tw-border-b tw-border-gray-200'>
        <div className='tw-flex tw-justify-between tw-items-center'>
          <div>
            <p className='tw-text-lg tw-font-bold'>{name}</p>
            <p className='tw-text-sm tw-text-gray-500'>{recent}</p>
          </div>
          <div>
            <p className='tw-text-sm tw-text-gray-500'>{BitterDate(time)}</p>
          </div>
        </div>
      </li>
    </Link>
  );
}
