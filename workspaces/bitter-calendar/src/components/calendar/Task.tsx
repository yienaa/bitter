import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CalendarTask } from '../../types/task';

const TaskWrapper = styled.div`
  position: absolute;
  top: 20px;
`;

const TaskElement = styled.div<TaskElementPros>`
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

interface TaskElementPros {
  width: number;
  top: number;
  left: number;
  active: boolean;
}

interface TaskPros {
  tasks: CalendarTask[];
}

export default function Task({ tasks }: TaskPros): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [singleWidth, setSingleWidth] = useState(0);

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
  }, []);

  function onMouseOver(eventId: string) {}

  function onMouseLeave(eventId: string) {}

  return (
    <TaskWrapper ref={ref}>
      {tasks?.map((event, i) => (
        <TaskElement
          key={event.id + i}
          width={event.days * singleWidth}
          top={i * 20 + i * 2}
          left={event.left ? event.left * singleWidth : 0}
          active={event.id === ''}
          onMouseOver={() => onMouseOver(event.id)}
          onMouseLeave={() => onMouseLeave(event.id)}
        >
          {event.days}
        </TaskElement>
      ))}
    </TaskWrapper>
  );
}
