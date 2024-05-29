import { IMessage } from '@/app/types/common';

export function Message({ user, message, time }: IMessage) {
  return (
    <div className='tw-flex tw-justify-between'>
      <div className='tw-flex tw-items-center'>
        <div className='tw-w-12 tw-h-12 tw-rounded-full tw-bg-gray-200'></div>
        <div className='tw-ml-4'>
          <p className='tw-text-lg tw-font-bold'>{user}</p>
          <p className='tw-text-sm tw-text-gray-500'>{message}</p>
        </div>
      </div>
      <div className='tw-flex tw-items-center'>
        <p className='tw-text-sm tw-text-gray-500'>{time}</p>
      </div>
    </div>
  );
}
