import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Day from './Day';
import { theme } from '../../../styles/theme';
import { DayInfo, WeekInfo } from '../../types/calendar';
import { generate7Days } from '../../utils/dayInfo';
import { TaskContext } from '../../contexts/TaskContext';
import Task from './Task';

const DayWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid ${theme.colors.gray[300]};
`;

interface WeekProps {
  week: WeekInfo;
}

export default function Week({ week }: WeekProps): React.ReactElement {
  const { eventEntities, eventDispatch } = useContext(TaskContext);
  const [days, setDays] = useState<DayInfo[]>(generate7Days(week.firstDayOfWeek));
  const createDayElements = () => {
    const elements: React.ReactElement[] = [];
    days.forEach((day) => {
      elements.push(
        <Day
          key={`day-${day.key}`}
          day={day}
        >
          <Task
            key={`task-${day.key}`}
            day={day}
            tasks={eventEntities?.arrange?.[day.key] ?? []}
          />
          ,
        </Day>,
      );
    });
    return elements;
  };

  return <DayWrapper>{createDayElements()}</DayWrapper>;
}
