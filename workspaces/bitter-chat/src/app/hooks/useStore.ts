/**
 * 상태관련 외부 라이브러리 사용 전 스터디를 위한 상태관리 훅
 */

import { useState } from 'react';

export function useStore<State>(initialState: State) {}

export function useStoreSelector<State, Value>(selector: (state: State) => Value) {}
