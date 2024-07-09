import { useEffect, useState } from 'react';
import { CalendarEvent } from '../types/event';

export function useEvent(initialValue?: CalendarEvent[]): [CalendarEvent[] | null, (event: CalendarEvent[]) => void] {
  const [event, setEvent] = useState<CalendarEvent[] | null>(initialValue || null);
  useEffect(() => {
    // 초기에 데이터 불러와야항
  }, []);
  return [event, setEvent];
}
