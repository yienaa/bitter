import { Context, createContext, Dispatch, SetStateAction } from 'react';
import { CalendarTask } from '../types/task';

interface IHoverTaskContext {
    hoverTask: string | null;
    setHoverTask: Dispatch<SetStateAction<string | null>>;
 }
  
export const HoverEventContext: Context<IHoverTaskContext> = createContext<IHoverTaskContext>({
    hoverTask: null,
    setHoverTask: () => {},
});