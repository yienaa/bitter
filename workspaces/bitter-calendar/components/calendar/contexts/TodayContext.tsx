import { Context, createContext } from 'react';
import { DayInfo } from '../models';
import { calculateDayInfo } from '../utils/dayInfo';

export const TodayContext: Context<DayInfo> = createContext<DayInfo>(calculateDayInfo());
