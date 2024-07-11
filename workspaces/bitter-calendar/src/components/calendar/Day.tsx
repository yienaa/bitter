import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import { DayInfo } from '../../types/calendar';
import { getDateFormat, getMonthFormat } from '../../utils/i18n';
import { EventContext } from '../../contexts/EventContext';
import { CalendarEventBase } from '../../types/event';
import { EVENT_DISPATCH_TYPE } from '../../hooks/useEvent';
import Event from './Event';

export const EMPTY_IMAGE = new Image(1, 1);
EMPTY_IMAGE.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const DayWrapper = styled.div<DayProps>`
  &:not(:last-child) {
    border-right: 1px solid ${colors.border};
  }

  ${({ day }) => day.isToday && `background-color: ${colors.primary}; color: white;`}
  ${({ day }) => {
    if (day.day === 0) {
      return `color: ${colors.accent};`;
    } else if (day.day === 6) {
      return `color: ${colors.primary};`;
    } else {
      return;
    }
  }}
`;

interface DayProps {
  day: DayInfo;
}

export default function Day({ day }: DayProps): React.ReactElement {
  const { eventDispatch } = useContext(EventContext);

  function dragStart(e: React.DragEvent<HTMLDivElement>) {
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
    eventDispatch({ type: EVENT_DISPATCH_TYPE.TEMP, payload: [newEvent] });
  }

  function dragOver(e: React.DragEvent<HTMLDivElement>) {
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
    </DayWrapper>
  );
}
