import styled from 'styled-components';
import Week from './Week';
import { WeekInfo } from '../../types/calendar';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import dayjs from 'dayjs';
import { useTask } from '../../hooks/useTask';
import { CalendarTask } from '../../types/task';

const WeekWrapper = styled.div`
  width: 100%;
  height: 100%;

  > div {
    height: calc(100% / 6);
  }
`;

interface WeekEvents {
  [weekKey: string]: CalendarTask[];
}

interface MonthProps {
  weeks: WeekInfo[];
}

export default function Month({ weeks }: MonthProps): React.ReactElement {
  // const eventHandleContext;
  const [eventEntities, eventDispatch] = useTask();

  const injectEvent = useCallback((): WeekEvents => {
    if (!eventEntities) return {};
    const copiedEvents = eventEntities.changedEvents.map((id) => ({
      ...eventEntities.entities[id],
    }));

    const result: WeekEvents = {};
    weeks.forEach((week) => {
      result[week.key] = [];
      copiedEvents.forEach((event, index) => {
        const eventStart = dayjs(event.start);
        const eventEnd = dayjs(event.end);
        const weekStart = dayjs(week.firstDayOfWeek.isoString);
        const weekEnd = dayjs(week.lastDayOfWeek.isoString);

        if (eventEnd.isBefore(weekStart) || eventStart.isAfter(weekEnd)) {
          return; // 이 주에 해당하지 않는 이벤트
        }

        const left = Math.max(0, eventStart.diff(weekStart, 'days'));
        const right = Math.min(7, eventEnd.diff(weekStart, 'days') + 1);
        const days = right - left;

        result[week.key].push({ ...event, days, left });

        if (eventEnd.isBefore(weekEnd) || eventEnd.isSame(weekEnd)) {
          copiedEvents.splice(index, 1); // 이벤트가 이번 주에 끝나면 제거
        } else {
          event.days -= days; // 다음 주를 위해 남은 일수 조정
        }
      });
    });
    return result;
  }, [eventEntities, weeks]); // eventEntities와 weeks가 변경될 때만 함수 재생성

  const [events, setEvents] = useState<WeekEvents>(() => injectEvent());

  useEffect(() => {
    if (eventEntities) {
      const newEvents = injectEvent();
      setEvents((prevEvents) => ({
        ...prevEvents,
        ...Object.fromEntries(
          Object.entries(newEvents).map(([key, value]) => [key, [...(prevEvents[key] || []), ...value]]),
        ),
      }));
    }
  }, [eventEntities, injectEvent]);

  const memoizedEvents = useMemo(() => events, [events]);

  return (
    <TaskContext.Provider value={{ eventEntities, eventDispatch }}>
      <WeekWrapper>
        {weeks.map((week) => (
          <Week
            key={week.key}
            week={week}
            events={memoizedEvents[week.key]}
          />
        ))}
      </WeekWrapper>
    </TaskContext.Provider>
  );
}
