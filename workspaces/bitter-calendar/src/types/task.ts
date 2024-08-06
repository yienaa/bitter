import { ISODateString } from './calendar';

export interface CalendarEventBase {
  id: string;
  isTemp: boolean;
  title: string;
  start: ISODateString;
  end: ISODateString;
  allDay: boolean;
}
export interface CalendarTask extends CalendarEventBase {
  days: number;
  left?: number; // todo 임시데이터
  top?: number;
  description?: string;
  location?: string;
  attendees?: string[];
}
