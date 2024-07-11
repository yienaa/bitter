import styled from 'styled-components';
import Week from './Week';
import { DayInfo, WeekInfo } from '../../types/calendar';
import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/EventContext';
import { generate7Days } from '../../utils/dayInfo';
import { distributeEventToWeek } from '../../utils/event';

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
      weeks.map((week) => {
        const event = distributeEventToWeek(week, eventEntities);
        console.error('eventEntities', eventEntities, weeks, event);
        // TODO event를 week에 넣어주는 로직
        // TODO event 계산시 며칠짜리 이벤트인지 계산해서 넣어주기
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
