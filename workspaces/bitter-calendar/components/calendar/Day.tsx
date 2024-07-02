import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { DayInfo } from './models';

const DayWrapper = styled.div`
  &:not(:last-child) {
    border-right: 1px solid ${colors.border};
  }
`;

interface DayProps {
  day: DayInfo;
}
export default function Day({ day }: DayProps): React.ReactElement {
  return (
    <DayWrapper>
      {day.month} ::: {day.date}
    </DayWrapper>
  );
}
