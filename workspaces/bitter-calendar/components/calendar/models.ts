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

export interface DayInfo {
  day: number;
  isToday: boolean;
  isHoliday: boolean;
  isPrevMonth: boolean;
  isNextMonth: boolean;
  weekOnMonth: number;
  isoString: ISOZeroDateString;
}

export interface MonthInfo {
  month: number;
  year: number;
  weeksInMonth: number;
  firstDayOfMonth: number;
  prevMonthLastDate: number;
}

export interface WeekInfo {
  firstDayOfWeek: DayInfo;
  lastDayOfWeek: DayInfo;
}

export interface Calendar {
  today: Today;
  focusedMonth: MonthInfo;
}

export type ISODateString = string; // "2011-10-05T14:48:00.000Z"
export type ISOZeroDateString = string; // "2011-10-05T00:00:00.000Z"
