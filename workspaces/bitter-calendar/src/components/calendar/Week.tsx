import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Day from './Day';
import { colors } from '../../../styles/theme';
import { DayInfo, WeekInfo } from '../../types/calendar';
import { generate7Days } from '../../utils/dayInfo';
import { EventContext } from '../../contexts/EventContext';
import Event from './Event';

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
}

export default function Week({ week }: WeekProps): React.ReactElement {
  const { eventEntities } = useContext(EventContext);
  const [days, setDays] = useState<DayInfo[]>(generate7Days(week.firstDayOfWeek));
  // useMemo(() => {
  //   if (eventEntities) {
  //     setDays(
  //       days.map((day) => {
  //         const event = eventEntities?.arrange[day.key];
  //         if (event) {
  //           day.events = event;
  //         }
  //         return day;
  //       }),
  //     );
  //   }
  // }, [eventEntities]);
  console.error('eventEntities', eventEntities);
  const createDays = days.map((day) => (
    <Day
      key={day.key}
      day={day}
    />
  ));
  return (
    <DayWrapper>
      {createDays} <Event events={week.events} />
    </DayWrapper>
  );
}
