import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CalendarEvent } from '../../types/event';

const EventWrapper = styled.div`
  position: absolute;
  top: 20px;
`;

const EventElement = styled.div<{ width: number; top: number; left: number }>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: 20px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: red;
  cursor: pointer;

  &:hover {
    background: mediumspringgreen;
  }
`;

interface EventPros {
  events: CalendarEvent[];
}

export default function Event({ events }: EventPros): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [singleWidth, setSingleWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const width = (ref.current!.parentElement as HTMLElement)?.offsetWidth;
        console.log(123123, width);
        if (width) {
          setSingleWidth(width / 7);
        }
      });
      resizeObserver.observe(ref.current!.parentElement as HTMLElement);
    }
  }, []);

  return (
    <EventWrapper ref={ref}>
      {events?.map((event, i) => (
        <EventElement
          key={event.id + i}
          width={event.days * singleWidth}
          top={i * 20 + i * 2}
          left={event.left ? event.left * singleWidth : 0}
        >
          {event.days}
        </EventElement>
      ))}
    </EventWrapper>
  );
}
