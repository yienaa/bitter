import { useState, Dispatch, SetStateAction } from 'react';
import { CalendarTask } from '../types/task';

export function useHoverTask(): [string | null, Dispatch<SetStateAction<string | null>>] {
  const [hoverTask, setHoverTask] = useState<string | null>(null);

  return [hoverTask, setHoverTask];
}
