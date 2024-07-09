import { Context, createContext, Dispatch, SetStateAction } from 'react';
import { calculateDayInfo } from '../utils/dayInfo';
import { CurrentInfo, DayInfo } from '../types/calendar';
import { CalendarEvent } from '../types/event';
import { EventDispatch } from '../hooks/useEvent';

interface ICurrentContext {
  event: CalendarEvent[] | null;
  eventDispatch: Dispatch<EventDispatch>;
}

export const EventContext: Context<ICurrentContext> = createContext<ICurrentContext>({
  event: null,
  eventDispatch: () => {},
});
