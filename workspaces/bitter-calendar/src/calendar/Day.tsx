import React, { useRef } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { DayInfo } from '../types/calendar';
import { getDateFormat, getMonthFormat } from '../utils/i18n';
import { Simulate } from 'react-dom/test-utils';
import dragOver = Simulate.dragOver;

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
  function dragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setDragImage(EMPTY_IMAGE, 0, 0);
    e.dataTransfer.setData('startDate', day.isoString);
    console.log('dragStart', e, e.dataTransfer.getData('startDate'));
  }

  function dragEnd(e: React.DragEvent<HTMLDivElement>) {
    console.log(day.isoString);
    console.log(e, 'dragEnd', e.dataTransfer.getData('startDate'));
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
