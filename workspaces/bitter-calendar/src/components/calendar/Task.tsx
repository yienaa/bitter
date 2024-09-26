import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CalendarTask } from '../../types/task';
import { TaskContext } from '../../contexts/TaskContext';
import { EventMapData } from '../../hooks/useTask';
import { DayInfo } from '../../types/calendar';
import dayjs from 'dayjs';

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
  background-color: dimgray;
  cursor: pointer;

  &:hover {
    background-color: aqua;
  }
`;

interface TaskElementPros {
  width: number;
  top: number;
  left: number;
}

interface TaskPros {
  tasks: EventMapData;
  day: DayInfo;
}

export default function Task({ tasks, day }: TaskPros): React.ReactElement {
  const { eventEntities } = useContext(TaskContext);
  const ref = useRef<HTMLDivElement>(null);
  const [singleWidth, setSingleWidth] = useState(0);
  const [taskEntities, setTaskEntities] = useState<CalendarTask[]>([]);

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const width = (ref.current?.parentElement as HTMLElement)?.offsetWidth;
        if (width) {
          setSingleWidth(width);
        }
      });
      resizeObserver.observe(ref.current?.parentElement as HTMLElement);
    }
  }, []);

  // useEffect(() => {
  //   if (!tasks.length) return;
  //   console.log(tasks, day.key);
  // }, [eventEntities]);

  function onMouseOver(eventId: string) {}

  function onMouseLeave(eventId: string) {}

  const renderTask = () => {
    if (!tasks) return;
    let tempTopIndex = 0;
    return tasks.map((taskId, index) => {
      if (!taskId) {
        tempTopIndex++;
        return null;
      }
      const targetTask = eventEntities?.entities?.[taskId];
      if (!targetTask) return null;
      const diff = dayjs(targetTask.end).diff(dayjs(day.dateObject), 'days') + 1;
      const days = day.day === 0 ? (diff > 7 ? 7 : diff) : targetTask.days;
      const width = singleWidth * days;
      const top = index * (2 + 20);
      const left = 0;
      const active = false;
      if (!taskId) return null;
      tempTopIndex = 0;
      return (
        <TaskElement
          key={index}
          width={width}
          top={top}
          left={left}
          onMouseOver={() => onMouseOver(taskId)}
          onMouseLeave={() => onMouseLeave(taskId)}
        />
      );
    });
  };

  return <TaskWrapper ref={ref}>{renderTask()}</TaskWrapper>;
}
