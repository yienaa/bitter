import React from 'react';
import Calendar from './Calendar';
import Input from '../ui/Input';
import Button from '../ui/Button';
import styled from 'styled-components';
import Controllers from './Controllers';

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
`;

const CalendarNav = styled.div`
  grid-area: side-bar;
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
        <Input /> <Button label='설정' />
      </CalendarHeader>
      <CalendarNav>wwerwerw</CalendarNav>
      <CalendarBody>
        <Controllers />
        <Calendar />
      </CalendarBody>
    </Grid>
  );
}
