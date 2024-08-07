import { DayInfo, ISODateString } from '../types/calendar';
import dayjs, { Dayjs } from 'dayjs';

export function generateDayInfo(isoString?: ISODateString): DayInfo {
  const day = new Date(isoString || new Date().toISOString());
  const year = day.getFullYear();
  const month = day.getMonth();
  const date = day.getDate();
  const dayOfWeek = day.getDay();
  const today = new Date();
  const isToday = day.toDateString() === today.toDateString();
  const isHoliday = day.getDay() === 0 || day.getDay() === 6;
  const weekOnMonth = Math.floor((day.getDate() - 1) / 7) + 1;
  const isoStringDate = dayjs(day).startOf('day');

  return {
    key: dayjs(day).format('YYYY-MM-DD'),
    year,
    month,
    date,
    day: dayOfWeek,
    isToday,
    isHoliday,
    isPrevMonth: false,
    isNextMonth: false,
    weekOnMonth,
    isoString: isoStringDate.toISOString(),
    dateObject: day,
  };
}

export function generate7Days(firstDayOfWeek: DayInfo): DayInfo[] {
  const days: DayInfo[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek.isoString);
    day.setDate(firstDayOfWeek.date + i);
    days.push(generateDayInfo(day.toISOString()));
  }
  return days;
}

export function generateDayInfoKey(day: ISODateString): string {
  const targetDay = new Date(day);
  return `${targetDay.getFullYear()}-${targetDay.getMonth() + 1}-${targetDay.getDate()}`;
}
