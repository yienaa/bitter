import { DayInfo, WeekInfo } from '../types/calendar';
import { generateDayInfo } from './dayInfo';
import dayjs from 'dayjs';

export function generateWeekInfo(year: number, month: number, week: number): WeekInfo | null {
  const firstDayOfWeek = getFirstDayOfWeek(year, month, week);
  const lastDayOfWeek = getLastDayOfWeek(firstDayOfWeek);
  return {
    key: dayjs(firstDayOfWeek.dateObject).format('YYYY-MM-DD'),
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
  const calculatedWeeks = weeksInMonth < 5 ? weeksInMonth + 1 : weeksInMonth;
  for (let i = 1; i <= calculatedWeeks + 1; i++) {
    const week = generateWeekInfo(year, month, i);
    if (week) {
      weeks.push(week);
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

/**
 * Get the weekday
 * TODO i18n https://day.js.org/docs/en/customization/weekday-names
 */
export function getWeekday(): string[] {
  return ['일', '월', '화', '수', '목', '금', '토'];
}