import { Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';
import { CalendarEvent, CalendarEventBase } from '../types/event';
import { ISODateString } from '../types/calendar';

export type EventMap = { [key: string]: EventMapData } | null;
export type EventMapData = (string | null)[];
export type RawEventMap = { [key: string]: CalendarEvent } | null;

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
export function useEvent(): [RawEventMap, EventMap, Dispatch<EventDispatch>] {
  const [rawEvent, eventDispatch] = useReducer(eventReducer, null);
  const [eventMap, setEventMap] = useState<EventMap>(null);
  useEffect(() => {
    if (rawEvent) {
      setEventMap(arrangeEvents(rawEvent));
    }
  }, [rawEvent]);

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

  function eventReducer(state: RawEventMap | null, action: EventDispatch): RawEventMap | null {
    switch (action.type) {
      case EVENT_DISPATCH_TYPE.ADD:
      case EVENT_DISPATCH_TYPE.TEMP:
        if (state) {
          return {
            ...state,
            ...convertCalendarEventDataToRawData(action.payload),
          };
        }
        return convertCalendarEventDataToRawData(action.payload);
      case EVENT_DISPATCH_TYPE.DELETE:
        if (state) {
          action.payload.forEach((event) => {
            delete state[event.id];
          });
          return { ...state };
        }
        return state;
      case EVENT_DISPATCH_TYPE.UPDATE:
        if (state) {
          action.payload.forEach((event) => {
            state[event.id] = convertToCalendarData(event);
          });
          return { ...state };
        }
        return state;
      default:
        return state;
    }
  }

  return [rawEvent, eventMap, eventDispatch];
}

// TODO 0711 날짜계산버그있음. 이벤트가 없을 경우 0으로 보정이 안됨
function arrangeEvents(events: RawEventMap): { [key: string]: (string | null)[] } | null {
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
