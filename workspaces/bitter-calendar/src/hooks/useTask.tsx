import { Dispatch, useReducer } from 'react';
import { CalendarTask, CalendarEventBase } from '../types/task';
import { ISODateString } from '../types/calendar';
import dayjs from 'dayjs';

export type EventEntities = {
  changedEvents: string[];
  entities: RawEventMap;
  arrange: EventArrange;
} | null;
export type EventArrange = { [key: string]: EventMapData } | null;
export type EventMapData = (string | null)[];
export type RawEventMap = { [key: string]: CalendarTask };

export const TASK_DISPATCH_TYPE = {
  ADD: 'add',
  TEMP: 'temp',
  DELETE: 'delete',
  UPDATE: 'update',
};
export type TaskDispatchType = (typeof TASK_DISPATCH_TYPE)[keyof typeof TASK_DISPATCH_TYPE];

export interface TaskDispatch {
  type: TaskDispatchType;
  payload: CalendarEventBase[] | CalendarTask[];
}

// TODO 데이터가 좀 실용적??????이지 않음
export function useTask(): [EventEntities, Dispatch<TaskDispatch>] {
  const [eventEntities, eventDispatch] = useReducer(eventReducer, null);

  function diffNumberOfDay(start: ISODateString, end: ISODateString): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }

  function convertToCalendarData(event: CalendarEventBase): CalendarTask {
    return {
      ...event,
      days: diffNumberOfDay(event.start, event.end!),
    };
  }

  function convertCalendarEventDataToRawData(payload: CalendarEventBase[] | CalendarTask[]): RawEventMap {
    return payload.reduce((acc, cur) => ({ ...acc, [cur.id]: convertToCalendarData(cur) }), {});
  }

  function eventReducer(state: EventEntities | null, action: TaskDispatch): EventEntities | null {
    switch (action.type) {
      case TASK_DISPATCH_TYPE.ADD:
        if (state) {
          const newEvents = convertCalendarEventDataToRawData(action.payload);
          const newEntities = {
            ...state.entities,
            ...newEvents,
          };
          return {
            changedEvents: Object.keys(newEvents),
            entities: newEntities,
            arrange: arrangeEvents(newEntities),
          };
        }
        const newEntities = convertCalendarEventDataToRawData(action.payload);
        return {
          changedEvents: Object.keys(newEntities),
          entities: newEntities,
          arrange: arrangeEvents(newEntities),
        };
      case TASK_DISPATCH_TYPE.TEMP:
        if (state) {
          const targetEvent = {
            ...state.entities[action.payload[0].id],
            ...action.payload[0],
            id: 'temp',
          };

          console.log('1111', targetEvent)
          const tempEvents = convertCalendarEventDataToRawData([targetEvent]);
          const newEntities = {
            ...state.entities,
            ...tempEvents,
          };
          return {
            changedEvents: Object.keys(tempEvents),
            entities: newEntities,
            arrange: arrangeEvents(newEntities),
          };
        }
        return state;
      case TASK_DISPATCH_TYPE.DELETE:
        if (state) {
          const newEntities = { ...state.entities };
          const changedEvents: string[] = [];
          action.payload.forEach((event) => {
            changedEvents.push(event.id);
            delete newEntities[event.id];
          });
          return {
            changedEvents,
            entities: newEntities,
            arrange: arrangeEvents(newEntities),
          };
        }
        return state;
      case TASK_DISPATCH_TYPE.UPDATE:
        if (state) {
          const newEntities = { ...state.entities };
          const changedEvents: string[] = [];
          action.payload.forEach((event) => {
            changedEvents.push(event.id);
            newEntities[event.id] = convertToCalendarData(event);
          });
          return {
            changedEvents,
            entities: newEntities,
            arrange: arrangeEvents(newEntities),
          };
        }
        return state;
      default:
        return state;
    }
  }

  return [eventEntities, eventDispatch];
}

function formatDate(date: dayjs.Dayjs): string {
  return date.format('YYYY-MM-DD');
}

function arrangeEvents(events: RawEventMap): EventArrange | null {
  if (!events) return null;
  const result: { [key: string]: (string | null)[] } = {};

  // Sort events by duration (longer first) and then by start time
  const sortedEvents = Object.values(events).sort((a, b) => {
    const aDuration = dayjs(a.end).diff(dayjs(a.start));
    const bDuration = dayjs(b.end).diff(dayjs(b.start));

    if (bDuration !== aDuration) {
      return bDuration - aDuration;
    }

    return dayjs(a.start).diff(dayjs(b.start));
  });

  sortedEvents.forEach((event, index) => {
    const startDate = dayjs(event.start);
    const endDate = dayjs(event.end);
    // set max position as the length of the current date's events
    let maxPosition = result[formatDate(startDate)]?.length - 1 || 0;

    // Find the appropriate position for the event
    let position = 0;
    let positionFound = false;
    
    while (!positionFound && position <= maxPosition) {
      positionFound = true;
      for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate); date = date.add(1, 'day')) {
        const dateKey = formatDate(date);
        if (result[dateKey]) {
          positionFound = false;
          position++;
          break;
        }
      }
    }

    // Set new max position if needed
    if (position > maxPosition) {
      maxPosition = position;
    }

    // Add the event to the result
    let isFirst = false;
    for (let date = startDate; date.isBefore(endDate.add(1, 'day')); date = date.add(1, 'day')) {
      const dateKey = formatDate(date);

      if (date.day() === 0) {
        isFirst = false;
      }

      if (!result[dateKey]) {
        result[dateKey] = new Array(maxPosition + 1).fill(0);
      }
      if (result[dateKey].length <= maxPosition) {
        result[dateKey] = [...result[dateKey], ...new Array(maxPosition + 1 - result[dateKey].length).fill(1)];
      }

      if (!isFirst) {
        isFirst = true;
        result[dateKey][position] = event.id;
      }
    }
  });

  return result;
}
