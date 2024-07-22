import styled from 'styled-components';
import Week from './Week';
import { WeekInfo } from '../../types/calendar';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { EventContext } from '../../contexts/EventContext';
import dayjs from 'dayjs';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

const WeekWrapper = styled.div`
  width: 100%;
  height: 100%;

  > div {
    height: calc(100% / 6);
  }
`;

interface MonthProps {
  weeks: WeekInfo[];
}

export default function Month({ weeks }: MonthProps): React.ReactElement {
  console.log('MonthMonthMonthMonthMonthMonthMonth');

  return (
    <WeekWrapper>
      {weeks.map((week) => (
        <Week
          key={week.key}
          week={week}
        />
      ))}
    </WeekWrapper>
  );
}
