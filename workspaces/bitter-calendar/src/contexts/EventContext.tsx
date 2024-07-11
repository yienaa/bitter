import { Context, createContext, Dispatch, SetStateAction } from 'react';
import { generateDayInfo } from '../utils/dayInfo';
import { CurrentInfo, DayInfo } from '../types/calendar';
import { CalendarEvent, CalendarEventBase } from '../types/event';
import { EventDispatch, EventEntities, RawEventMap } from '../hooks/useEvent';

interface ICurrentContext {
  eventEntities: EventEntities;
  eventDispatch: Dispatch<EventDispatch>;
}

export const EventContext: Context<ICurrentContext> = createContext<ICurrentContext>({
  eventEntities: null,
  eventDispatch: () => {},
});
