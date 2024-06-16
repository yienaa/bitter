import React from 'react';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import Input from '../ui/Input';
import Button from '../ui/Button';
import styled from 'styled-components';

const ControlItems = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
`;

export default function App(): React.ReactElement {
  return (
    <div>
      <ControlItems>
        <Input /> <Button label='설정' />
      </ControlItems>
      <CalendarHeader />
      <CalendarBody />
    </div>
  );
}
