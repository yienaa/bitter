'use client';


export default function Home() {
  return (
      <div>하이이이</div>
  );
}


// 상태는 컴포넌트 외부 어딘가에 두고 여러 컴포넌트가 같이 쓰여야한다
// 상태를 사용하는 변화를 알아잴 수 있어야하고 변화될 때마다 리렌터링이 일어나 최신 상태값 기준으로 렌더링 되어야함
// 내가 감지하지 않는 값이 변한다면 리렌더링 일어나면 안됨
type Initializer<T> = T extends any ? T | (() => T) : never;

type Store<State> = {
    get: () => State;
    set: (action: Initializer<State>) => State;
    subscribe: (callback: () => void) => () => void;
}
