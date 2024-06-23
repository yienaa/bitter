import React from 'react';
import Calendar from './Calendar';
import Input from '../ui/Input';
import Button from '../ui/Button';
import styled from 'styled-components';
import Controllers from './Controllers';
import { colors } from '../styles/theme';

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 200px calc(100% - 200px);
  grid-template-rows: 60px calc(100% - 60px);
  grid-template-areas:
    'header header'
    'side-bar main';
`;

const CalendarHeader = styled.div`
  grid-area: header;
  padding: 10px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid ${colors.border};
`;

const CalendarNav = styled.div`
  grid-area: side-bar;
  border-right: 1px solid ${colors.border};
`;

const CalendarBody = styled.div`
  grid-area: main;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default function App(): React.ReactElement {
  return (
    <Grid>
      <CalendarHeader>
        <Input />
        <Button iconClass='icon-search' />
      </CalendarHeader>
      <CalendarNav>작은달력올거얌</CalendarNav>
      <CalendarBody>
        <Controllers />
        <Calendar />
      </CalendarBody>
    </Grid>
  );
}
