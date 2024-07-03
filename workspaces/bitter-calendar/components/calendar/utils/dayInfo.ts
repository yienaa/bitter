import { DayInfo, ISODateString } from '../models';

export function calculateDayInfo(isoString?: ISODateString): DayInfo {
  const day = new Date(isoString || new Date().toISOString());
  const year = day.getFullYear();
  const month = day.getMonth();
  const date = day.getDate();
  const dayOfWeek = day.getDay();
  const today = new Date();
  const isToday = day.toDateString() === today.toDateString();
  const isHoliday = day.getDay() === 0 || day.getDay() === 6;
  const weekOnMonth = Math.floor((day.getDate() - 1) / 7) + 1;
  const isoStringDate = new Date(day.setUTCHours(0, 0, 0, 0));

  return {
    key: `${year}-${month + 1}-${date}`,
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
    days.push(calculateDayInfo(day.toISOString()));
  }
  return days;
}
