import { Dispatch, SetStateAction, useState } from 'react';
import { CurrentInfo } from '../types/calendar';
import { calculateCurrentInfo } from '../utils/currentInfo';

export default function useCurrent(): [CurrentInfo, Dispatch<SetStateAction<CurrentInfo>>] {
  const [current, setCurrent] = useState<CurrentInfo>(calculateCurrentInfo());

  return [current, setCurrent];
}
