export interface DragInfo {
  isDragging: boolean;
  dragStartDay: number;
  dragStartWeek: number;
  dragEndDay: number;
  dragEndWeek: number;
}

export interface Today {
  year: number;
  month: number;
  date: number;
}

export interface MonthInfo {
  month: number;
  year: number;
  weeksInMonth: number;
  firstDayOfMonth: number;
  prevMonthLastDate: number;
}

export interface DayInfo {
  key: string;
  year: number;
  month: number; // 0 ~ 11
  date: number; // 1 ~ 31
  day: number; // 0 ~ 6
  isToday: boolean;
  isHoliday: boolean;
  isPrevMonth: boolean;
  isNextMonth: boolean;
  weekOnMonth: number;
  isoString: ISOZeroDateString;
}

export interface WeekInfo {
  key: string;
  year: number;
  month: number;
  weekOfMonth: number;
  firstDayOfWeek: DayInfo;
}

export interface Calendar {
  today: Today;
  focusedMonth: MonthInfo;
}

export type ISODateString = string; // "2011-10-05T14:48:00.000Z"
export type ISOZeroDateString = string; // "2011-10-05T00:00:00.000Z"
