import { Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';
import { CalendarEvent, CalendarEventBase } from '../types/event';
import { ISODateString } from '../types/calendar';

export const EVENT_DISPATCH_TYPE = {
  ADD: 'add',
  TEMP: 'temp',
  DELETE: 'delete',
  UPDATE: 'update',
};
export type EventDispatchType = (typeof EVENT_DISPATCH_TYPE)[keyof typeof EVENT_DISPATCH_TYPE];
export interface EventDispatch {
  type: EventDispatchType;
  payload: CalendarEventBase | CalendarEvent[];
}
// TODO map 으로 변환
export function useEvent(initialValue?: CalendarEvent[]): [CalendarEvent[] | null, Dispatch<EventDispatch>] {
  const [event, eventDispatch] = useReducer(eventReducer, initialValue || null);
  useEffect(() => {
    console.error(event);
    console.error(arrangeEvents(event || []));
  }, [event]);

  function diffNumberOfDay(start: ISODateString, end: ISODateString): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }
  function convertToCalendarData(event: CalendarEventBase): CalendarEvent[] {
    return [
      {
        ...event,
        days: diffNumberOfDay(event.start, event.end),
      },
    ];
  }
  function eventReducer(state: CalendarEvent[] | null, action: EventDispatch) {
    const newEvent: CalendarEvent[] = Array.isArray(action.payload)
      ? action.payload
      : convertToCalendarData(action.payload);
    switch (action.type) {
      case EVENT_DISPATCH_TYPE.ADD:
      case EVENT_DISPATCH_TYPE.TEMP:
        if (state) {
          return [...state, ...newEvent];
        }
        return newEvent;
      case EVENT_DISPATCH_TYPE.DELETE:
        if (state) {
          return state.filter((event) => event.id !== newEvent[0].id);
        }
        return state;
      case EVENT_DISPATCH_TYPE.UPDATE:
        if (state) {
        }
        return state;
      default:
        return state;
    }
  }

  return [event, eventDispatch];
}

function arrangeEvents(events: CalendarEvent[]): { [key: string]: (string | null)[] } {
  const result: { [key: string]: (string | null)[] } = {};
  const eventPositions: { [id: string]: number } = {};
  let maxPosition = 0;

  // 이벤트를 시작 시간 순으로 정렬
  const sortedEvents = events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  sortedEvents.forEach((event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

    // 이벤트에 위치 할당
    if (eventPositions[event.id] === undefined) {
      eventPositions[event.id] = maxPosition++;
    }

    // 시작 날짜부터 종료 날짜까지 순회
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateKey = date.toISOString().split('T')[0];

      if (!result[dateKey]) {
        result[dateKey] = new Array(maxPosition).fill(null);
      }

      // 해당 날짜의 배열에서 이벤트의 위치에 이벤트 ID 추가
      result[dateKey][eventPositions[event.id]] = event.id;

      // 필요한 경우 배열 크기 확장
      if (result[dateKey].length < maxPosition) {
        result[dateKey] = [...result[dateKey], ...new Array(maxPosition - result[dateKey].length).fill(null)];
      }
    }
  });

  return result;
}
