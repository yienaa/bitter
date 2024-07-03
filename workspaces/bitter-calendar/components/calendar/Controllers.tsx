import React, { useContext } from 'react';
import Button from '../../ui/Button';
import styled from 'styled-components';
import { UI_COLOR, UI_VARIANT } from '../../types/style';
import { colors } from '../../styles/theme';
import useToday from './hooks/useToday';
import { TodayContext } from './contexts/TodayContext';
import { getMonthFormat } from './utils/i18n';
import { MonthContext } from './contexts/MonthContext';
import { calculateMonthInfo } from './utils/monthInfo';

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
  const { month, setMonth } = useContext(MonthContext);

  function nextMonth() {
    setMonth(calculateMonthInfo(month.year, month.month + 1));
  }
  function prevMonth() {
    setMonth(calculateMonthInfo(month.year, month.month - 1));
  }

  return (
    <ControllButtons>
      <Button label='오늘' />
      <ButtonGroup>
        <Button
          iconClass='icon-chevron-left'
          variant={UI_VARIANT.OUTLINED}
          color={UI_COLOR.SECONDARY}
          onClick={prevMonth}
        />
        <Button label={today.year} />
        <Button label={getMonthFormat(today.dateObject)} />
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
