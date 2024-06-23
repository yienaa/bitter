import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';

const DayWrapper = styled.div`
  &:not(:last-child) {
    border-right: 1px solid ${colors.border};
  }
`;

export default function Day({ index, pIndex }: any): React.ReactElement {
  return (
    <DayWrapper>
      {pIndex} ::: {index}
    </DayWrapper>
  );
}
