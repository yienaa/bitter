import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { DayInfo } from '../types/calendar';
import { getDateFormat, getMonthFormat } from '../utils/i18n';

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
  return (
    <DayWrapper day={day}>
      {getMonthFormat(day.dateObject)} {getDateFormat(day.dateObject)}
    </DayWrapper>
  );
}
