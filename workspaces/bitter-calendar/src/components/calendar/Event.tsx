import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { EventContext } from '../../contexts/EventContext';
import { CalendarEvent } from '../../types/event';

const EventWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const EventElement = styled.div<EventPros>`
  &:not(:first-child) {
    margin-top: 2px;
  }

  height: 20px;
  ${({ id }) => (id ? `background-color: red;` : ``)}
`;

interface EventPros {
  events: CalendarEvent[] | undefined;
}

export default function Event({ events }: EventPros): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const { eventEntities, eventDispatch } = useContext(EventContext);
  const [event, setEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        console.log(ref.current?.offsetWidth);
      });
      resizeObserver.observe(ref.current);
    }
  }, []);

  return <EventWrapper ref={ref}> {/*<EventElement id={id}>{id && id.substring(0, 4)}</EventElement>*/}</EventWrapper>;
}
