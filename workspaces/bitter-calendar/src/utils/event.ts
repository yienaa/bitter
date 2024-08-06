import { WeekInfo } from '../types/calendar';
import { EventEntities } from '../hooks/useTask';
import { CalendarTask } from '../types/task';

export function drawEvent() {
  console.log('draw event');
}

export function drawTempEvent() {
  console.log('draw temp event');
}

export function distributeEventToWeek(week: WeekInfo, eventList: CalendarTask[]): CalendarTask[] {
  const result = [];
  return [];
}
