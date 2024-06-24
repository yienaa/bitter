import React from 'react';
import Calendar from './Calendar';
import Input from '../ui/Input';
import Button from '../ui/Button';
import styled from 'styled-components';
import Controllers from './Controllers';
import { colors } from '../styles/theme';

const Header = styled.div`
  grid-area: header;
  padding: 10px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid ${colors.border};
`;

export default function CalendarHeader(): React.ReactElement {
  return (
    <Header>
      <Input placeholder='일정검색할거야' />
      <Button iconClass='icon-search' />
    </Header>
  );
}
