import { DayInfo, WeekInfo } from '../types/calendar';
import { generateDayInfo } from './dayInfo';

export function generateWeekInfo(year: number, month: number, week: number): WeekInfo | null {
  const firstDayOfWeek = getFirstDayOfWeek(year, month, week);
  const lastDayOfWeek = getLastDayOfWeek(firstDayOfWeek);
  console.error(firstDayOfWeek);
  return {
    key: `${year}-${month + 1}+${week}`,
    year,
    month,
    weekOfMonth: week,
    firstDayOfWeek,
    lastDayOfWeek,
  };
}

export function generate6Weeks(year: number, month: number): WeekInfo[] {
  const weeks: WeekInfo[] = [];
  const weeksInMonth = getWeeksCountInMonth(year, month);

  for (let i = 1; i <= weeksInMonth; i++) {
    const week = generateWeekInfo(year, month, i);
    if (week) {
      weeks.push(week);
    }
  }

  if (weeksInMonth < 6) {
    const restCount = 6 - weeksInMonth;
    const nextMonth = month + 1;
    const nextYear = nextMonth === 12 ? year + 1 : year;

    for (let i = 1; i <= restCount; i++) {
      const week = generateWeekInfo(nextYear, nextMonth, i);
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
  const date = 1 + (week - 1) * 7 - firstDayOfMonth;
  const monthToUse = date <= 0 ? month - 1 : month;
  const yearToUse = monthToUse === -1 ? year - 1 : year;
  const dateToUse = date <= 0 ? prevMonthLastDate + date : date;
  const day = new Date(yearToUse, monthToUse, dateToUse);
  console.error(day.toISOString());
  return generateDayInfo(day.toISOString());
}

/**
 * Get the last day of the week
 * @param year
 * @param month
 * @param week
 */
export function getLastDayOfWeek(firstDayOfWeek: DayInfo): DayInfo {
  const lastDay = new Date(firstDayOfWeek.dateObject);
  lastDay.setDate(firstDayOfWeek.date + 6);

  return generateDayInfo(lastDay.toISOString());
}
