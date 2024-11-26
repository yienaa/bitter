import React, { useContext, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { DayInfo } from '../../types/calendar';
import { getDateFormat, getMonthFormat } from '../../utils/i18n';
import { TaskContext } from '../../contexts/TaskContext';
import { HoverEventContext } from '../../contexts/HoverEventContext';
import { CalendarEventBase } from '../../types/task';
import { TASK_DISPATCH_TYPE } from '../../hooks/useTask';
import dayjs from 'dayjs';

export const EMPTY_IMAGE = new Image(1, 1);
EMPTY_IMAGE.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const DayWrapper = styled.div<DayProps>`
  &:not(:last-child) {
    border-right: 1px solid ${theme.colors.gray[300]};
  }

  ${({ day }) => day.isToday && `background-color: ${theme.colors.primary.main}; color: white;`}
  ${({ day }) => {
    if (day.day === 0) {
      return `color: ${theme.colors.primary.main};`;
    } else if (day.day === 6) {
      return `color: ${theme.colors.primary.main};`;
    } else {
      return;
    }
  }}
`;

interface DayProps {
  day: DayInfo;
  children?: React.ReactNode;
}

export default function Day({ day, children }: DayProps): React.ReactElement {
  const { eventEntities, eventDispatch } = useContext(TaskContext);
  const { hoverTask } = useContext(HoverEventContext);
  const [isUpdateTemp, setIsUpdateTemp] = useState(false);
  const dragMode = '';

  function dragStart(e: React.DragEvent<HTMLDivElement>) {
    if (hoverTask) {
      e.dataTransfer.effectAllowed = 'none';
      e.dataTransfer.setDragImage(EMPTY_IMAGE, 0, 0);
      return;
    }
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setDragImage(EMPTY_IMAGE, 0, 0);
    e.dataTransfer.setData('startDate', day.isoString);
  }

  function dragEnd(e: React.DragEvent<HTMLDivElement>) {
    const newEvent: CalendarEventBase = {
      id: window.crypto.randomUUID(),
      isTemp: false,
      title: 'New Event',
      start: e.dataTransfer.getData('startDate'),
      end: day.isoString,
      allDay: true,
    };
    eventDispatch({ type: TASK_DISPATCH_TYPE.ADD, payload: [newEvent] });
    console.log('dragEnd', hoverTask);
  }

  function dragOver(e: React.DragEvent<HTMLDivElement>) {
    if (hoverTask) {
      const targetTaskId = hoverTask;
      const originTask = eventEntities?.entities?.[targetTaskId]!;
      const newEvent: CalendarEventBase = {
        id: targetTaskId,
        isTemp: true,
        start: day.isoString,
        end: dayjs(day.isoString).add(originTask.days - 1, 'day').toISOString(),
      };
      eventDispatch({ type: TASK_DISPATCH_TYPE.TEMP, payload: [newEvent] });
    }
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <DayWrapper
      day={day}
      draggable={true}
      onDragStart={dragStart}
      onDrop={dragEnd}
      onDragOver={dragOver}
    >
      {getMonthFormat(day.dateObject)} {getDateFormat(day.dateObject)}
      {children}
    </DayWrapper>
  );
}
