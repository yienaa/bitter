import { StylePropsComponent } from '@/app/types/common';

export function Editor({ className }: StylePropsComponent) {
  return (
    <div className={`${className} tw-flex`}>
      <input
        type='text'
        className='tw-flex-1'
      />
      <button className='tw-w-16 tw-h-full tw-bg-blue-500 tw-text-white'>전송</button>
    </div>
  );
}
