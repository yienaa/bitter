import { EventMapData, RawEventMap } from '../hooks/useEvent';

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

export interface CurrentInfo {
  month: number;
  year: number;
  weeksInMonth: number;
  dateObject: Date;
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
  dateObject: Date;
}

export interface WeekInfo {
  key: string;
  year: number;
  month: number;
  weekOfMonth: number;
  firstDayOfWeek: DayInfo;
  lastDayOfWeek: DayInfo;
  events?: EventMapData; //event key[]
}

export type ISODateString = string; // "2011-10-05T14:48:00.000Z"
export type ISOZeroDateString = string; // "2011-10-05T00:00:00.000Z"
