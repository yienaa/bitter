import { Context, createContext, Dispatch, SetStateAction } from 'react';
import { MonthInfo } from '../models';
import { calculateMonthInfo } from '../utils/monthInfo';

interface IMonthContext {
  month: MonthInfo;
  setMonth: Dispatch<SetStateAction<MonthInfo>>;
}
export const MonthContext: Context<IMonthContext> = createContext<IMonthContext>({
  month: calculateMonthInfo(),
  setMonth: () => {},
});
