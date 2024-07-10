import { Context, createContext, Dispatch, SetStateAction } from 'react';
import { calculateDayInfo } from '../utils/dayInfo';
import { CurrentInfo, DayInfo } from '../types/calendar';
import { CalendarEvent, CalendarEventBase } from '../types/event';
import { EventDispatch, EventMap, RawEventMap } from '../hooks/useEvent';

interface ICurrentContext {
  rawEvent: RawEventMap;
  eventMap: EventMap;
  eventDispatch: Dispatch<EventDispatch>;
}

export const EventContext: Context<ICurrentContext> = createContext<ICurrentContext>({
  rawEvent: null,
  eventMap: null,
  eventDispatch: () => {},
});
