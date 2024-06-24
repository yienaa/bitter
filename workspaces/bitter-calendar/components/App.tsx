import React from 'react';
import Calendar from './Calendar';
import styled from 'styled-components';
import Controllers from './Controllers';
import { colors } from '../styles/theme';
import CalendarHeader from './CalendarHeader';

// TODO: 여기서 레이아웃 요소 모두 스타일링

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 200px calc(100% - 200px);
  grid-template-rows: 60px calc(100% - 60px);
  grid-template-areas:
    'header header'
    'side-bar main';
`;

const CalendarNav = styled.div`
  grid-area: side-bar;
  border-right: 1px solid ${colors.border};

  // TODO: 작은 달력 스타일링
  // 화면 800px 이하일 경우 스르륵 사라짐
  // 화면 800px 이상일 경우 스르륵 나타남
`;

const CalendarBody = styled.div`
  grid-area: main;
  flex: 1;
  min-width: 600px;
  display: flex;
  flex-direction: column;
`;

export default function App(): React.ReactElement {
  return (
    <Grid>
      <CalendarHeader />
      <CalendarNav>작은달력올거얌</CalendarNav>
      <CalendarBody>
        <Controllers />
        <Calendar />
      </CalendarBody>
    </Grid>
  );
}
