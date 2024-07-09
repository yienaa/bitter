import { DayInfo, ISODateString } from './calendar';

export interface CalendarEvent {
  id: string;
  isTemp: boolean;
  title: string;
  start: ISODateString;
  end: ISODateString;
  allDay: boolean;
  description?: string;
  location?: string;
  attendees?: string[];
}
