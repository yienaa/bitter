import { StylePropsComponent } from '@/app/types/common';

export function Editor({ className }: StylePropsComponent) {
  return (
    <input
      type='text'
      className='tw-flex-1'
    />
  );
}
