import React,  {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import { CurrentContext } from '../../contexts/CurrentContext';
import { generate6Weeks, getWeekday } from '../../utils/weekInfo';
import { WeekInfo } from '../../types/calendar';
import useCurrent from '../../hooks/useCurrent';
import { generate7Days } from '../../utils/dayInfo';
import useToday from '../../hooks/useToday';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;
const Header = styled.div`

`;
const Day = styled.div`
display: flex;
            
> div {
        width: 100%;
        text-align: center;
    }
`;
const Week = styled.div`
    display: flex;

`;
const Date = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;

    &.is-today {
        background-color: red;
    }
`;
export default function SmallCalendar(): React.ReactElement {
    const today = useToday();
    const [current, setCurrent] = useCurrent()
    const [weeks, setWeeks] = useState<WeekInfo[]>(generate6Weeks(current.year, current.month));
    const weekDays = getWeekday();
    useEffect(() => {
        console.log(today);
    }, [current]);

    return <Wrapper>
        <Header>{current.year} {current.month + 1}</Header>
        <Day>{weekDays.map((day) => <div key={day}>{day}</div>)}</Day> 
        {
            weeks.map((week) => {
                return <Week key={week.key}>
                    {
                        generate7Days(week.firstDayOfWeek).map((day) => {
                            return <Date key={day.key} className={`${today.key === day.key ? 'is-today' : ''}`}>{day.date}</Date>
                        })
                    }
                </Week>
            })
        }
    </Wrapper>;
}