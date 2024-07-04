import React, { useContext } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import Button from '../ui/Button';
import { UI_COLOR, UI_VARIANT } from '../types/style';
import { TodayContext } from '../contexts/TodayContext';
import { CurrentContext } from '../contexts/CurrentContext';
import { calculateCurrentInfo } from '../utils/currentInfo';
import { getMonthFormat, getYearFormat } from '../utils/i18n';

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
  const today = useContext(TodayContext);
  const { current, setCurrent } = useContext(CurrentContext);

  function nextMonth() {
    setCurrent(calculateCurrentInfo(current.year, current.month + 1));
  }
  function prevMonth() {
    setCurrent(calculateCurrentInfo(current.year, current.month - 1));
  }

  function goToday() {
    setCurrent(calculateCurrentInfo(today.year, today.month));
  }

  return (
    <ControllButtons>
      <Button
        label='오늘'
        onClick={goToday}
      />
      <ButtonGroup>
        <Button
          iconClass='icon-chevron-left'
          variant={UI_VARIANT.OUTLINED}
          color={UI_COLOR.SECONDARY}
          onClick={prevMonth}
        />
        <Button label={getYearFormat(current.dateObject)} />
        <Button label={getMonthFormat(current.dateObject)} />
        <Button
          iconClass='icon-chevron-right'
          variant={UI_VARIANT.OUTLINED}
          color={UI_COLOR.SECONDARY}
          onClick={nextMonth}
        />
      </ButtonGroup>
      <Button label='단위' />
    </ControllButtons>
  );
}
