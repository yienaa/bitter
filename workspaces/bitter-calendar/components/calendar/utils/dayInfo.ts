import { DayInfo, ISODateString } from '../models';

export function calculateDayInfo(isoString?: ISODateString): DayInfo {
  const day = new Date(isoString || new Date().toISOString());
  const today = new Date();
  const isToday = day.toDateString() === today.toDateString();
  const isHoliday = day.getDay() === 0 || day.getDay() === 6;
  const weekOnMonth = Math.floor((day.getDate() - 1) / 7) + 1;

  return {
    day: day.getDate(),
    isToday,
    isHoliday,
    isPrevMonth: false,
    isNextMonth: false,
    weekOnMonth,
    isoString: day.toISOString(),
  };
}
