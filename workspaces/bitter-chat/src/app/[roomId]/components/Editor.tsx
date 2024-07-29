import { StylePropsComponent } from '@/app/types/common';
import { KeyboardEvent, useRef, useState } from 'react';

export function Editor({ roomId }: StylePropsComponent) {
  const ref = useRef<HTMLInputElement>(null);
  function createMessage() {
    const body = {
      roomId,
      user: '레나',
      message: ref.current?.value,
    };
    fetch('http://localhost:8000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then();
  }

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      console.log(1231231231);
      createMessage();
    }
  }

  return (
    <>
      <input
        ref={ref}
        type='text'
        className='tw-w-full tw-p-2 tw-rounded-full tw-border tw-border-gray-300 tw-outline-none tw-box-border'
        placeholder='입력하세요...'
        onKeyUp={handleKeyUp}
      />
      <button
        className='tw-shrink-0 tw-w-11 tw-bg-blue-500 tw-text-white tw-font-semibold tw-rounded-full tw-ml-2 tw-p-2 tw-border-none tw-cursor-pointer tw-select-none'
        onClick={createMessage}
      >
        {' > '}
      </button>
    </>
  );
}
