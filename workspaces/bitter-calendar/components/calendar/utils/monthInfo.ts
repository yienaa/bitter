import { MonthInfo } from '../models';
import { getWeeksInMonth } from './weekInfo';

export function monthInfo(year: number, month: number): MonthInfo {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const weeksInMonth = getWeeksInMonth(year, month);
  const prevMonthLastDate = new Date(year, month, 0).getDate();

  return {
    month,
    year,
    weeksInMonth,
    firstDayOfMonth,
    prevMonthLastDate,
  };
}
