import { MonthInfo } from '../models';
import { getWeeksCountInMonth } from './weekInfo';

// TODO month > 12 혹은 그 반대인 케이스 계싼

export function calculateMonthInfo(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth(),
): MonthInfo {
  const weeksInMonth = getWeeksCountInMonth(year, month);

  return {
    month,
    year,
    weeksInMonth,
  };
}
