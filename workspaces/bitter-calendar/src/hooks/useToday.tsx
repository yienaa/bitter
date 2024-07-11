import { useEffect, useState } from 'react';
import { generateDayInfo } from '../utils/dayInfo';
import { DayInfo } from '../types/calendar';

export default function useToday() {
  const [today, setToday] = useState<DayInfo>(generateDayInfo());
  return today;
}
