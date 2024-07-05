import React, { useEffect, useState, WheelEvent } from 'react';
import styled from 'styled-components';
import Controllers from './Controllers';
import Week from './Week';
import { WeekInfo } from '../../types/calendar';
import { generate6Weeks } from '../../utils/weekInfo';
import { TodayContext } from '../../contexts/TodayContext';
import { CurrentContext } from '../../contexts/CurrentContext';
import useToday from '../../hooks/useToday';
import useCurrent from '../../hooks/useCurrent';
import useDebounce from '../../hooks/useDebounce';
import { calculateCurrentInfo } from '../../utils/currentInfo';

function baseCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const weeks = getWeeksInMonth(year, month);
}

const getToday = () => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
  };
};

const getWeeksInMonth = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstDayOfWeek = firstDay.getDay();
  const lastDayOfWeek = lastDay.getDay();

  const used = firstDayOfWeek + (lastDay.getDate() - lastDayOfWeek);
  return Math.ceil(used / 7);
};

const WeekWrapper = styled.div`
  width: 100%;
  height: 100%;

  > div {
    height: calc(100% / 6);
  }
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
export default function CalendarBody(): React.ReactElement {
  const today = useToday();
  const [current, setCurrent] = useCurrent();
  const [weeks, setWeeks] = useState<WeekInfo[]>(generate6Weeks(today.year, today.month));
  const [deltaY, setDeltaY] = useState(0);
  const debounce = useDebounce<number>(deltaY);

  useEffect(() => {
    // TODO virtualInfinityScroll 사용을 위해 size 6로 유지해야함
    setWeeks(generate6Weeks(current.year, current.month));
  }, [current]);

  useEffect(() => {
    if (debounce === 0) return;
    if (debounce > 0) {
      setCurrent(calculateCurrentInfo(current.year, current.month + 1));
    } else {
      setCurrent(calculateCurrentInfo(current.year, current.month - 1));
    }
  }, [debounce]);

  const onWheelEvent = (event: WheelEvent<HTMLDivElement>) => setDeltaY(event.deltaY);

  return (
    <TodayContext.Provider value={today}>
      <CurrentContext.Provider value={{ current: current, setCurrent: setCurrent }}>
        <BodyWrapper onWheel={onWheelEvent}>
          <Controllers />
          <WeekWrapper>
            {weeks.map((week) => (
              <Week
                key={week.key}
                week={week}
              />
            ))}
          </WeekWrapper>
        </BodyWrapper>
      </CurrentContext.Provider>
    </TodayContext.Provider>
  );
}
