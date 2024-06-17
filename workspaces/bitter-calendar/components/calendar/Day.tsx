import React from 'react';
import styled from 'styled-components';

const DayWrapper = styled.div`
  &:not(:last-child) {
    border-right: 1px solid #000;
  }
`;

export default function Day({ index, pIndex }: any): React.ReactElement {
  return (
    <DayWrapper>
      {pIndex} ::: {index}
    </DayWrapper>
  );
}
