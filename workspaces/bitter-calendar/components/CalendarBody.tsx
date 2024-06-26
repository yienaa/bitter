import React, { useEffect } from 'react';
import styled from 'styled-components';
import Week from './calendar/Week';
import Controllers from './calendar/Controllers';
import useToday from './calendar/hooks/useToday';
import userMonth from './calendar/hooks/useMonth';
import useMonth from './calendar/hooks/useMonth';
import { generate6Weeks } from './calendar/utils/weekInfo';
import { WeekInfo } from './calendar/models';

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
  const { year, month } = useToday();
  // TODO virtualInfinityScroll 사용을 위해 size 6로 유지해야함
  const weeks: WeekInfo[] = generate6Weeks(year, month);

  const createWeeks = weeks?.map((week: WeekInfo, index) => (
    <Week
      key={week.key}
      week={week}
    />
  ));

  return (
    <>
      <Controllers />
      <Wrapper>{createWeeks}</Wrapper>
    </>
  );
}
