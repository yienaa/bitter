import { Context, createContext, Dispatch } from 'react';
import { EventEntities, TaskDispatch } from '../hooks/useTask';

interface ICurrentContext {
  eventEntities: EventEntities;
  eventDispatch: Dispatch<TaskDispatch>;
}

export const TaskContext: Context<ICurrentContext> = createContext<ICurrentContext>({
  eventEntities: null,
  eventDispatch: () => {},
});
