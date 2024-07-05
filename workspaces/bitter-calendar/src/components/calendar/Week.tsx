import React from 'react';
import styled from 'styled-components';
import Day from './Day';
import { colors } from '../../../styles/theme';
import { DayInfo, WeekInfo } from '../../types/calendar';
import { generate7Days } from '../../utils/dayInfo';

const DayWrapper = styled.div`
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
  const days: DayInfo[] = generate7Days(week.firstDayOfWeek);
  const createDays = days.map((day) => (
    <Day
      key={day.key}
      day={day}
    />
  ));
  return <DayWrapper>{createDays}</DayWrapper>;
}
