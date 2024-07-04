import { useEffect, useState } from 'react';
import { calculateDayInfo } from '../utils/dayInfo';
import { DayInfo } from '../types/calendar';

export default function useToday() {
  const [today, setToday] = useState<DayInfo>(calculateDayInfo());
  return today;
}
