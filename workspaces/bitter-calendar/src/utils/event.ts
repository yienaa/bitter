import { WeekInfo } from '../types/calendar';
import { EventEntities } from '../hooks/useEvent';
import { CalendarEvent } from '../types/event';

export function drawEvent() {
  console.log('draw event');
}

export function drawTempEvent() {
  console.log('draw temp event');
}

export function distributeEventToWeek(week: WeekInfo, eventList: CalendarEvent[]): CalendarEvent[] {
  const result = [];
  return [];
}
