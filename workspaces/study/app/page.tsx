'use client';

import React from "react";



// 상태는 컴포넌트 외부 어딘가에 두고 여러 컴포넌트가 같이 쓰여야한다
// 상태를 사용하는 변화를 알아잴 수 있어야하고 변화될 때마다 리렌터링이 일어나 최신 상태값 기준으로 렌더링 되어야함
// 내가 감지하지 않는 값이 변한다면 리렌더링 일어나면 안됨
type Initializer<T> = T extends any ? T | (() => T) : never;

type Store<State> = {
    get: () => State;
    set: (action: Initializer<State>) => State;
    subscribe: (callback: () => void) => () => void;
}

export const createStore = <State extends unknown>(
    initialState: Initializer<State>
): Store<State> => {
    let state: State = typeof initialState === 'function' ? (initialState as () => State)() : initialState;

    const callbacks: Set<() => void> = new Set<() => void>();

    const get = () => state;
    const set = (nextState: State | ((prev: State) => State)): State => {
        state = typeof nextState === 'function' ? (nextState as (prev: State) => State)(state) : nextState;
        callbacks.forEach(callback => callback());

        return state;
    }

    const subscribe = (callback: () => void) => {
        callbacks.add(callback);

        return () => {
            callbacks.delete(callback);
        }
    }

    return {get, set, subscribe};
}

export const useStore = <State extends unknown>(store: Store<State>) => {
    const [state, setState] = React.useState(() => store.get());

    React.useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.get());
        });
        return unsubscribe;
    }, [store]);

    return [state, store.set] as const;
}

export const useStoreSelector = <State extends unknown, Value extends unknown>(
    store: Store<State>,
    selector: (state: State) => Value
) => {
    const [state, setState] = React.useState(() => selector(store.get()));

    React.useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(selector(store.get()));
        });
        return unsubscribe;
    }, [store, selector]);

    return state;
}

// usage

const store: Store<{count: number}> = createStore({count: 0});

export default function Home() {
    const [state, setState] = useStore(store);

    function handleIncrement() {
        setState((prev) => ({count: prev.count + 1}));
    }

    return (
        <div className="w-full h-8 flex flex-col">
            <h1>하이잉 : {state.count}</h1>
            <button onClick={handleIncrement}>눌러봥</button>
        </div>
    );
}

