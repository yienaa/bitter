import React from 'react';
import styled from 'styled-components';
import Day from './Day';
const DayWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #000;
`;

export default function Week({ index: pIndex }: any): React.ReactElement {
  const testWeek = Array.from({ length: 7 }).map((_, index) => (
    <Day
      key={index}
      index={index}
      pIndex={pIndex}
    ></Day>
  ));
  return <DayWrapper>{testWeek}</DayWrapper>;
}
