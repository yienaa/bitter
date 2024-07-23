import { DayInfo, ISODateString } from './calendar';

export interface CalendarEventBase {
  id: string;
  isTemp: boolean;
  title: string;
  start: ISODateString;
  end: ISODateString;
  allDay: boolean;
}
export interface CalendarEvent extends CalendarEventBase {
  days: number;
  left?: number; // todo 임시데이터
  description?: string;
  location?: string;
  attendees?: string[];
}
