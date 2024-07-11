import { Context, createContext } from 'react';
import { generateDayInfo } from '../utils/dayInfo';
import { DayInfo } from '../types/calendar';

export const TodayContext: Context<DayInfo> = createContext<DayInfo>(generateDayInfo());
