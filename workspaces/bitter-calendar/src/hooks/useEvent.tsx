import { Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';
import { CalendarEvent, CalendarEventBase } from '../types/event';
import { ISODateString } from '../types/calendar';

export type EventEntities = {
  entities: RawEventMap;
  arrange: EventArrange;
} | null;
export type EventArrange = { [key: string]: EventMapData } | null;
export type EventMapData = (string | null)[];
export type RawEventMap = { [key: string]: CalendarEvent };

export const EVENT_DISPATCH_TYPE = {
  ADD: 'add',
  TEMP: 'temp',
  DELETE: 'delete',
  UPDATE: 'update',
};
export type EventDispatchType = (typeof EVENT_DISPATCH_TYPE)[keyof typeof EVENT_DISPATCH_TYPE];

export interface EventDispatch {
  type: EventDispatchType;
  payload: CalendarEventBase[] | CalendarEvent[];
}

// TODO map 으로 변환
export function useEvent(): [EventEntities, Dispatch<EventDispatch>] {
  const [eventEntities, eventDispatch] = useReducer(eventReducer, null);

  function diffNumberOfDay(start: ISODateString, end: ISODateString): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }

  function convertToCalendarData(event: CalendarEventBase): CalendarEvent {
    return {
      ...event,
      days: diffNumberOfDay(event.start, event.end),
    };
  }

  function convertCalendarEventDataToRawData(payload: CalendarEventBase[] | CalendarEvent[]): RawEventMap {
    return payload.reduce((acc, cur) => ({ ...acc, [cur.id]: convertToCalendarData(cur) }), {});
  }

  function eventReducer(state: EventEntities | null, action: EventDispatch): EventEntities | null {
    switch (action.type) {
      case EVENT_DISPATCH_TYPE.ADD:
      case EVENT_DISPATCH_TYPE.TEMP:
        if (state) {
          const newEntities = {
            ...state.entities,
            ...convertCalendarEventDataToRawData(action.payload),
          };
          return {
            entities: newEntities,
            arrange: arrangeEvents(newEntities),
          };
        }
        const newEntities = convertCalendarEventDataToRawData(action.payload);
        return {
          entities: newEntities,
          arrange: arrangeEvents(newEntities),
        };
      case EVENT_DISPATCH_TYPE.DELETE:
        if (state) {
          const newEntities = { ...state.entities };
          action.payload.forEach((event) => {
            delete newEntities[event.id];
          });
          return {
            entities: newEntities,
            arrange: arrangeEvents(newEntities),
          };
        }
        return state;
      case EVENT_DISPATCH_TYPE.UPDATE:
        if (state) {
          const newEntities = { ...state.entities };
          action.payload.forEach((event) => {
            newEntities[event.id] = convertToCalendarData(event);
          });
          return {
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

function arrangeEvents(events: RawEventMap): EventArrange {
  if (!events) return null;
  const result: { [key: string]: (string | null)[] } = {};
  let maxPosition = 0;

  // 이벤트를 시작 시간 순으로 정렬
  const sortedEvents = Object.values(events).sort((a, b) => {
    // 먼저 이벤트 기간으로 정렬 (긴 이벤트가 먼저 오도록)
    const aDuration = new Date(a.end).getTime() - new Date(a.start).getTime();
    const bDuration = new Date(b.end).getTime() - new Date(b.start).getTime();

    const durationDiff = bDuration - aDuration;

    if (durationDiff !== 0) {
      return durationDiff;
    }

    // 기간이 같다면 시작 시간으로 정렬
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });

  sortedEvents.forEach((event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

    // 이벤트에 적합한 위치 찾기
    let position = 0;
    let positionFound = false;

    while (!positionFound && position <= maxPosition) {
      positionFound = true;
      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateKey = formatDate(date);
        if (result[dateKey] && result[dateKey][position] !== null) {
          positionFound = false;
          position++;
          break;
        }
      }
    }

    // 새로운 최대 위치 설정
    if (position > maxPosition) {
      maxPosition = position;
    }

    // 결과에 이벤트 추가
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateKey = formatDate(date);

      if (!result[dateKey]) {
        result[dateKey] = new Array(maxPosition + 1).fill(null);
      } else if (result[dateKey].length <= maxPosition) {
        result[dateKey] = [...result[dateKey], ...new Array(maxPosition + 1 - result[dateKey].length).fill(null)];
      }

      result[dateKey][position] = event.id;
    }
  });

  return result;
}

// 날짜 형식화 함수
function formatDate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
