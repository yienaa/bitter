import styled from 'styled-components';
import Week from './Week';
import { WeekInfo } from '../../types/calendar';
import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/EventContext';
import dayjs from 'dayjs';

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
  const { eventEntities } = useContext(EventContext);
  const [weekInfos, setWeekInfos] = useState<WeekInfo[]>(weeks);

  // TODO 함수 분리가넝
  useEffect(() => {
    if (eventEntities) {
      const copiedEvents = [...Object.values(eventEntities.entities)];
      weeks.map((week) => {
        week.events = [];

        let size = copiedEvents.length;
        for (let i = 0; i < size; i++) {
          if (dayjs(copiedEvents[i].start).isAfter(week.lastDayOfWeek.isoString)) {
            continue;
          }
          if (!dayjs(copiedEvents[i].end).isAfter(week.lastDayOfWeek.isoString)) {
            week.events!.push(copiedEvents[i]);
            copiedEvents.splice(i, 1);
            size--;
            i--;
            continue;
          }
          if (!dayjs(copiedEvents[i].start).isBefore(week.firstDayOfWeek.isoString)) {
            week.events!.push(copiedEvents[i]);
            continue;
          }
        }
      });
    }
  }, [eventEntities]);

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
