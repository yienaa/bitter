import { StylePropsComponent } from '@/app/types/common';
import { Editor } from '@/app/components/Editor';
import { MessageList } from '@/app/components/MeesageList';
import { useSocket } from '@/app/hooks/useSocket';

export function Room({ className }: StylePropsComponent<any>) {
  const socket = useSocket('http://localhost:8000');

  function createMessage() {
    const body = {
      user: '레나',
      message: '안녕하세요안뇨아아아아뇬뇨앙욘',
    };
    fetch('http://localhost:8000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then();
  }

  return (
    <div className={`${className} tw-w-full tw-h-full tw-flex tw-flex-col`}>
      <div className='tw-flex-1 tw-flex tw-flex-col-reverse'>
        <MessageList className='tw-flex-1' />
      </div>
      <div className='tw-h-10 tw-flex'>
        <Editor className='tw-min-h-16 tw-max-h-24' />
        <button
          className='tw-w-16 tw-h-full tw-bg-blue-500 tw-text-white'
          onClick={createMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
}
