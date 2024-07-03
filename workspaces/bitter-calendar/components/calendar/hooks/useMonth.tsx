import { Dispatch, SetStateAction, useState } from 'react';
import { MonthInfo } from '../models';
import { calculateMonthInfo } from '../utils/monthInfo';

// 얘를 어떻게 써야할지....
export default function useMonth(): [MonthInfo, Dispatch<SetStateAction<MonthInfo>>] {
  const [month, setMonth] = useState<MonthInfo>(calculateMonthInfo());

  return [month, setMonth];
}
