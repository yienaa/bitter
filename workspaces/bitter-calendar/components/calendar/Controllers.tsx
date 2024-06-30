import React from 'react';
import Button from '../../ui/Button';
import styled from 'styled-components';
import { UI_COLOR, UI_VARIANT } from '../../types/style';
import { colors } from '../../styles/theme';

const ControllButtons = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.border};
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
          iconClass='icon-chevron-left'
          variant={UI_VARIANT.OUTLINED}
          color={UI_COLOR.SECONDARY}
        />
        <Button label='2021년' />
        <Button label='5월' />
        <Button
          iconClass='icon-chevron-right'
          variant={UI_VARIANT.OUTLINED}
          color={UI_COLOR.SECONDARY}
        />
      </ButtonGroup>
      <Button label='단위' />
    </ControllButtons>
  );
}
