import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CalendarEvent } from '../../types/event';
import { eventBus } from '../../utils/eventBus';

const EventWrapper = styled.div`
  position: absolute;
  top: 20px;
`;

const EventElement = styled.div<{ width: number; top: number; left: number; active: boolean }>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: 20px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: ${({ active }) => (active ? 'aqua' : 'red')};
  cursor: pointer;

  &:hover {
    background-color: aqua;
  }
`;

interface EventPros {
  events: CalendarEvent[];
}

export default function Event({ events }: EventPros): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [singleWidth, setSingleWidth] = useState(0);
  const [activeId, setActiveId] = useState<string>('');
  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const width = (ref.current?.parentElement as HTMLElement)?.offsetWidth;
        if (width) {
          setSingleWidth(width / 7);
        }
      });
      resizeObserver.observe(ref.current?.parentElement as HTMLElement);
    }

    const eventMouseOver = ({ eventId }: { eventId: string }) => {
      setActiveId(eventId);
    };
    const eventMouseLeave = () => {
      setActiveId('');
    };

    eventBus.on('eventMouseOver', eventMouseOver);
    eventBus.on('eventMouseLeave', eventMouseLeave);

    return () => {
      eventBus.off('eventMouseOver', eventMouseOver);
      eventBus.off('eventMouseLeave', eventMouseLeave);
    };
  }, []);

  function onMouseOver(eventId: string) {
    eventBus.emit('eventMouseOver', { eventId });
  }

  function onMouseLeave(eventId: string) {
    eventBus.emit('eventMouseLeave', { eventId });
  }

  return (
    <EventWrapper ref={ref}>
      {events?.map((event, i) => (
        <EventElement
          key={event.id + i}
          width={event.days * singleWidth}
          top={i * 20 + i * 2}
          left={event.left ? event.left * singleWidth : 0}
          active={event.id === activeId}
          onMouseOver={() => onMouseOver(event.id)}
          onMouseLeave={() => onMouseLeave(event.id)}
        >
          {event.days}
        </EventElement>
      ))}
    </EventWrapper>
  );
}
