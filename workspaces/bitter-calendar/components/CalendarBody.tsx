import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Week from './calendar/Week';
import Controllers from './calendar/Controllers';
import useToday from './calendar/hooks/useToday';
import { generate6Weeks } from './calendar/utils/weekInfo';
import { WeekInfo } from './calendar/models';
import { TodayContext } from './calendar/contexts/TodayContext';
import { MonthContext } from './calendar/contexts/MonthContext';
import useMonth from './calendar/hooks/useMonth';

function baseCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const weeks = getWeeksInMonth(year, month);
  console.error(weeks);
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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  > div {
    height: calc(100% / 6);
  }
`;

export default function CalendarBody(): React.ReactElement {
  const today = useToday();
  const [month, setMonth] = useMonth();
  const [weeks, setWeeks] = useState<WeekInfo[]>(generate6Weeks(today.year, today.month));

  useEffect(() => {
    setWeeks(generate6Weeks(month.year, month.month));
  }, [month]);

  // TODO virtualInfinityScroll 사용을 위해 size 6로 유지해야함

  return (
    <TodayContext.Provider value={today}>
      <MonthContext.Provider value={{ month, setMonth }}>
        <Controllers />
        <Wrapper>
          {weeks.map((week) => (
            <Week
              key={week.key}
              week={week}
            />
          ))}
        </Wrapper>
      </MonthContext.Provider>
    </TodayContext.Provider>
  );
}
