import styled from 'styled-components';
import Week from './Week';
import { WeekInfo } from '../../types/calendar';
import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/EventContext';

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

  useEffect(() => {
    if (eventEntities) {
      const copiedEvents = [...Object.values(eventEntities.entities)];
      weeks.map((week) => {
        week.events = [];

        copiedEvents?.forEach((event, index) => {
          if (event.start <= week.firstDayOfWeek.key) {
            week.events!.push(event);
            console.log(event.end, week);
            if (event.end >= week.lastDayOfWeek.key) {
              copiedEvents.splice(index, 1);
              console.log('12123', index);
            }
          }
        });
        // TODO event를 week에 넣어주는 로직
        // TODO event 계산시 며칠짜리 이벤트인지 계산해서 넣어주기
      });
    }
    console.log(weeks);
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
