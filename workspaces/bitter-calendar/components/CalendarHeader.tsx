import React from 'react';
import Button from './Button';
import styled from 'styled-components';
import { UI_COLOR } from '../types/style';

const ControllButtons = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const NavigationButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    margin: 0 10px;
  }
`;
export default function CalendarHeader(): React.ReactElement {
  return (
    <ControllButtons>
      <Button label='오늘' />
      <NavigationButtonWrapper>
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
      </NavigationButtonWrapper>
      <Button label='단위' />
    </ControllButtons>
  );
}
