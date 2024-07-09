import { Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';
import { CalendarEvent } from '../types/event';

export const EVENT_DISPATCH_TYPE = {
  ADD: 'add',
  TEMP: 'temp',
  DELETE: 'delete',
  UPDATE: 'update',
};
export type EventDispatchType = (typeof EVENT_DISPATCH_TYPE)[keyof typeof EVENT_DISPATCH_TYPE];
export interface EventDispatch {
  type: EventDispatchType;
  payload: CalendarEvent | CalendarEvent[];
}

export function useEvent(initialValue?: CalendarEvent[]): [CalendarEvent[] | null, Dispatch<EventDispatch>] {
  const [event, eventDispatch] = useReducer(eventReducer, initialValue || null);
  useEffect(() => {
    console.error(event);
  }, [event]);

  function eventReducer(state: CalendarEvent[] | null, action: EventDispatch) {
    switch (action.type) {
      case EVENT_DISPATCH_TYPE.ADD:
      case EVENT_DISPATCH_TYPE.TEMP:
        if (state) {
          return [...state, action.payload as CalendarEvent];
        }
        return [action.payload as CalendarEvent];
      case EVENT_DISPATCH_TYPE.DELETE:
        if (state) {
          return state.filter((event) => event.id !== (action.payload as CalendarEvent).id);
        }
        return state;
      case EVENT_DISPATCH_TYPE.UPDATE:
        if (state) {
          return state.map((event) => {
            if (event.id === (action.payload as CalendarEvent).id) {
              return action.payload as CalendarEvent;
            }
            return event;
          });
        }
        return state;
      default:
        return state;
    }
  }

  return [event, eventDispatch];
}
