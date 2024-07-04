import { Context, createContext } from 'react';
import { calculateDayInfo } from '../utils/dayInfo';
import { DayInfo } from '../types/calendar';

export const TodayContext: Context<DayInfo> = createContext<DayInfo>(calculateDayInfo());
