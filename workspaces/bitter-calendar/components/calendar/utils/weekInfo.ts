import { DayInfo, WeekInfo } from '../models';
import { calculateDayInfo } from './dayInfo';

export function weekInfo(year: number, month: number, week: number): WeekInfo | null {
  const firstDayOfWeek = getFirstDayOfWeek(year, month, week);

  return {
    key: `${year}-${month}-${week}`,
    year,
    month,
    weekOfMonth: week,
    firstDayOfWeek,
  };
}

export function generate6Weeks(year: number, month: number): WeekInfo[] {
  const weeks: WeekInfo[] = [];
  const weeksInMonth = getWeeksCountInMonth(year, month);

  for (let i = 1; i <= weeksInMonth; i++) {
    const week = weekInfo(year, month, i);
    if (week) {
      weeks.push(week);
    }
  }

  if (weeksInMonth < 6) {
    const restCount = 6 - weeksInMonth;
    const nextMonth = month + 1;
    const nextYear = nextMonth === 12 ? year + 1 : year;
    const nextMonthIndex = nextMonth % 12;

    for (let i = 1; i <= restCount; i++) {
      const week = weekInfo(nextYear, nextMonthIndex, i);
      if (week) {
        weeks.push(week);
      }
    }
  }

  return weeks;
}

/**
 * Get the number of weeks in a month
 * @param year
 * @param month
 */
export function getWeeksCountInMonth(year: number, month: number): number {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstDayOfWeek = firstDay.getDay();
  const lastDayOfWeek = lastDay.getDay();

  const used = firstDayOfWeek + (lastDay.getDate() - lastDayOfWeek);
  return Math.ceil(used / 7);
}

/**
 * Get the first day of the week
 * @param year
 * @param month
 * @param week
 */
export function getFirstDayOfWeek(year: number, month: number, week: number): DayInfo {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  const firstDayOfWeek = (week - 1) * 7 - firstDayOfMonth + 1;
  const date = firstDayOfWeek > 0 ? firstDayOfWeek : prevMonthLastDate;

  return calculateDayInfo(new Date(year, month, date).toISOString());
}

// /**
//  * Get the last day of the week
//  * @param year
//  * @param month
//  * @param week
//  */
// export function getLastDayOfWeek(year: number, month: number, week: number): DayInfo {
//   return calculateDayInfo(new Date(year, month, date).toISOString());
// }
