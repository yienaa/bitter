import React, { useState } from 'react';
import styled from 'styled-components';
import Day from './Day';
import { colors } from '../../../styles/theme';
import { DayInfo, WeekInfo } from '../../types/calendar';
import { generate7Days } from '../../utils/dayInfo';
import Event from './Event';
import { CalendarEvent } from '../../types/event';

const DayWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid ${colors.border};
`;

interface WeekProps {
  week: WeekInfo;
  events: CalendarEvent[];
}

export default function Week({ week, events }: WeekProps): React.ReactElement {
  const [days, setDays] = useState<DayInfo[]>(generate7Days(week.firstDayOfWeek));

  console.log('WeekWeekWeekWeekWeek', events);

  const createDays = days.map((day) => (
    <Day
      key={day.key}
      day={day}
    />
  ));
  return (
    <DayWrapper>
      {createDays} <Event events={events} />
    </DayWrapper>
  );
}
