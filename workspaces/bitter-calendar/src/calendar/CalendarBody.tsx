import React, { useEffect, useState, WheelEvent } from 'react';
import styled from 'styled-components';
import Controllers from './Controllers';
import Week from './Week';
import { WeekInfo } from '../types/calendar';
import { generate6Weeks } from '../utils/weekInfo';
import { TodayContext } from '../contexts/TodayContext';
import { CurrentContext } from '../contexts/CurrentContext';
import useToday from '../hooks/useToday';
import useCurrent from '../hooks/useCurrent';
import { EventContext } from '../contexts/EventContext';
import { useEvent } from '../hooks/useEvent';

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
  const [month, setCurrent] = useCurrent();
  const [event, eventDispatch] = useEvent();
  const [weeks, setWeeks] = useState<WeekInfo[]>(generate6Weeks(today.year, today.month));

  useEffect(() => {
    // TODO virtualInfinityScroll 사용을 위해 size 6로 유지해야함
    setWeeks(generate6Weeks(month.year, month.month));
  }, [month]);

  const navigate = (event: WheelEvent<HTMLDivElement>) => {
    console.error(event.deltaY);
  };

  return (
    <TodayContext.Provider value={today}>
      <EventContext.Provider value={{ event: null, eventDispatch }}>
        <CurrentContext.Provider value={{ current: month, setCurrent }}>
          <BodyWrapper onWheel={navigate}>
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
      </EventContext.Provider>
    </TodayContext.Provider>
  );
}
