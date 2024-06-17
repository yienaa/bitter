import React from 'react';
import Button from '../ui/Button';
import styled from 'styled-components';
import { UI_COLOR } from '../types/style';
import Input from '../ui/Input';

const ControllButtons = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin: 0 5px;
  }
`;
export default function Controllers(): React.ReactElement {
  return (
    <ControllButtons>
      <Button label='오늘' />
      <ButtonGroup>
        <Button
          label='이전'
          color={UI_COLOR.SECONDARY}
        />
        <div>
          <Button label='2021년' />
          <Button label='5월' />
        </div>
        <Button
          label='다음'
          color={UI_COLOR.SECONDARY}
        />
      </ButtonGroup>
      <Button label='단위' />
    </ControllButtons>
  );
}
