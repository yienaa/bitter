import { useEffect, useState } from 'react';
import { calculateDayInfo } from '../utils/dayInfo';
import { DayInfo } from '../models';

export default function useToday() {
  const [today, setToday] = useState<DayInfo>(calculateDayInfo());

  // useEffect(() => {
  //   const today = calculateDayInfo();
  //   setToday(today);
  // }, []);

  return today;
}
