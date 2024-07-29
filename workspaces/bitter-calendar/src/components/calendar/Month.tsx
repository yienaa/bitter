import styled from 'styled-components';
import Week from './Week';
import { WeekInfo } from '../../types/calendar';
import React, { useEffect, useState } from 'react';
import { EventContext } from '../../contexts/EventContext';
import dayjs from 'dayjs';
import { useEvent } from '../../hooks/useEvent';
import { CalendarEvent } from '../../types/event';

const WeekWrapper = styled.div`
  width: 100%;
  height: 100%;

  > div {
    height: calc(100% / 6);
  }
`;

interface WeekEvents {
  [weekKey: string]: CalendarEvent[];
}

interface MonthProps {
  weeks: WeekInfo[];
}

export default function Month({ weeks }: MonthProps): React.ReactElement {
  const [eventEntities, eventDispatch] = useEvent();
  const [events, setEvents] = useState<WeekEvents>(() => injectEvent());

  useEffect(() => {
    if (eventEntities) {
      const newEvents: WeekEvents = injectEvent();
      setEvents((prev) => {
        return Object.keys(newEvents).reduce<WeekEvents>((acc, key) => {
          if (newEvents[key]) {
            acc[key] = [...(prev?.[key] || []), ...newEvents[key]];
          }
          return acc;
        }, {});
      });
    }
  }, [eventEntities]);

  function injectEvent(): WeekEvents {
    if (!eventEntities) return {};
    const copiedEvents = eventEntities.changedEvents.map((id) => {
      return { ...eventEntities.entities[id] };
    });

    console.log(copiedEvents);

    const result: WeekEvents = {};
    let size = copiedEvents.length;
    weeks.forEach((week) => {
      result[week.key] = [];
      for (let i = 0; i < size; i++) {
        // 1. 이벤트 시작일이 주의 마지막 날짜보다 이후인 경우와 이벤트 종료일이 주의 첫 날짜보다 이전인 경우 패스
        if (
          dayjs(copiedEvents[i].start).isAfter(week.lastDayOfWeek.isoString) ||
          dayjs(copiedEvents[i].end).isBefore(week.firstDayOfWeek.isoString)
        ) {
          continue;
        }

        // 2. 이벤트 종료일이 이번주 내 일 경우
        if (!dayjs(copiedEvents[i].end).isAfter(week.lastDayOfWeek.isoString)) {
          result[week.key].push({ ...copiedEvents[i] });
          copiedEvents.splice(i, 1);
          size--;
          i--;
          continue;
        }

        // 3. 이벤트 시작일이 이번주 내 일 경우
        if (!dayjs(copiedEvents[i].start).isBefore(week.firstDayOfWeek.isoString)) {
          // 이벤트 주기 내 이번주가 포함되는 일 수
          const diff = dayjs(copiedEvents[i].start).diff(week.firstDayOfWeek.isoString, 'days');
          const requiredDays = Math.abs(7 - diff);
          result[week.key].push({ ...copiedEvents[i], days: requiredDays, left: diff });
          copiedEvents[i].days = copiedEvents[i].days - requiredDays;
          continue;
        }

        // 이벤트 종료일이 이번주 이후 일 경우
        if (
          dayjs(copiedEvents[i].start).isBefore(week.firstDayOfWeek.isoString) &&
          dayjs(copiedEvents[i].end).isAfter(week.lastDayOfWeek.isoString)
        ) {
          // 이벤트 주기 내 이번주가 포함되는 일 수
          result[week.key].push({ ...copiedEvents[i], days: 7, left: 0 });
          copiedEvents[i].days = copiedEvents[i].days - 7;
          continue;
        }
      }
    });
    return result;
  }

  return (
    <EventContext.Provider value={{ eventEntities, eventDispatch }}>
      <WeekWrapper>
        {weeks.map((week) => (
          <Week
            key={week.key}
            week={week}
            events={events[week.key]}
          />
        ))}
      </WeekWrapper>
    </EventContext.Provider>
  );
}
