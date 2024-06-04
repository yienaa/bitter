import { StylePropsComponent } from '@/app/types/common';

export function Editor({ className }: StylePropsComponent) {
  return (
    <input
      type='text'
      className='tw-w-full tw-p-2 tw-rounded-full tw-border tw-border-gray-300 tw-outline-none tw-box-border'
      placeholder='입력하세요...'
    />
  );
}
