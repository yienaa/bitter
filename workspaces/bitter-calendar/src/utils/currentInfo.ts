import { CurrentInfo } from '../types/calendar';
import { getWeeksCountInMonth } from './weekInfo';

// TODO month > 12 혹은 그 반대인 케이스 계싼
export function calculateCurrentInfo(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth(),
): CurrentInfo {
  if (month < 0) {
    year -= 1;
    month = 11;
  } else if (month > 11) {
    year += 1;
    month = 0;
  }

  return {
    month,
    year,
    weeksInMonth: getWeeksCountInMonth(year, month),
    dateObject: new Date(year, month, 1),
  };
}
