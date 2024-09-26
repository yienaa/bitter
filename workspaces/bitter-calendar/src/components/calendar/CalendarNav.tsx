import React from 'react';
import styled from 'styled-components';
import SmallCalendar from './SmallCalendar';

const Nav = styled.div`
  grid-area: side-bar;

  // TODO: 작은 달력 스타일링
  // 화면 800px 이하일 경우 스르륵 사라짐
  // 화면 800px 이상일 경우 스르륵 나타남
`;

export default function CalendarNav(): React.ReactElement {
  return <Nav>
    <SmallCalendar />
  </Nav>;
}
