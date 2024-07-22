import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { EventContext } from '../../contexts/EventContext';
import { CalendarEvent } from '../../types/event';
import { WeekInfo } from '../../types/calendar';
import dayjs from 'dayjs';

const EventWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const EventElement = styled.div<{ width: number }>`
  &:not(:first-child) {
    margin-top: 2px;
  }

  width: ${({ width }) => width}px;
  height: 20px;
  background-color: red;
`;

interface EventPros {
  week: WeekInfo;
}

export default function Event({ week }: EventPros): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const { eventEntities, eventDispatch } = useContext(EventContext);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [singleWidth, setSingleWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (ref.current?.offsetWidth) {
          setSingleWidth(ref.current?.offsetWidth / 7);
        }
      });
      resizeObserver.observe(ref.current);
    }
  }, []);

  useMemo(() => {
    console.log(55555);
    injectEvent();
  }, [eventEntities]);

  function injectEvent() {
    if (!eventEntities) return;
    const copiedEvents = [...Object.values(eventEntities.entities)];
    // todo 변경된 주만 업데이트
    const result = [];
    let size = copiedEvents.length;
    for (let i = 0; i < size; i++) {
      // 1. 이벤트 시작일이 주의 마지막 날짜보다 이후인 경우와 이벤트 종료일이 주의 첫 날짜보다 이전인 경우 패스
      if (
        dayjs(copiedEvents[i].start).isAfter(week.lastDayOfWeek.isoString) ||
        dayjs(copiedEvents[i].end).isBefore(week.firstDayOfWeek.isoString)
      ) {
        console.log('pass', week.weekOfMonth, copiedEvents[i].id);
        continue;
      }

      // 2. 이벤트 종료일이 이번주 내일 경우
      if (!dayjs(copiedEvents[i].end).isAfter(week.lastDayOfWeek.isoString)) {
        result.push(copiedEvents[i]);
        copiedEvents.splice(i, 1);
        size--;
        i--;
        continue;
      }

      // 3. 이벤트 시작일이 이번주 내일 경우와 이벤트 종료일이 이번주 이후 일 경우
      if (
        !dayjs(copiedEvents[i].start).isBefore(week.firstDayOfWeek.isoString) ||
        dayjs(copiedEvents[i].end).isAfter(week.lastDayOfWeek.isoString)
      ) {
        result.push(copiedEvents[i]);
        // todo days 빼줘야함
        continue;
      }
    }
    setEvents(result);
  }
  return (
    <EventWrapper ref={ref}>
      {events?.map((event, i) => (
        <EventElement
          key={event.id + i}
          width={event.days * singleWidth}
        >
          {event.id + i}
        </EventElement>
      ))}
    </EventWrapper>
  );
}
