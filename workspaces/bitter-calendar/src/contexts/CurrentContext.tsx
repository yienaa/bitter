import { Context, createContext, Dispatch, SetStateAction } from 'react';
import { calculateCurrentInfo } from '../utils/currentInfo';
import { CurrentInfo } from '../types/calendar';

interface ICurrentContext {
  current: CurrentInfo;
  setCurrent: Dispatch<SetStateAction<CurrentInfo>>;
}

export const CurrentContext: Context<ICurrentContext> = createContext<ICurrentContext>({
  current: calculateCurrentInfo(),
  setCurrent: () => {},
});
