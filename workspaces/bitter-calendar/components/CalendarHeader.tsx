import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export default function CalendarHeader(): React.ReactElement {
  return (
    <Wrapper>
      <Input placeholder='일정검색할거야' />
      <Button iconClass='icon-search' />
    </Wrapper>
  );
}
