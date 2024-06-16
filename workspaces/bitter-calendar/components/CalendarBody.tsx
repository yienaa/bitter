import React, { useEffect, useState } from 'react';

function baseCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const weeks = getWeeksInMonth(year, month);
  console.error(weeks);
}
const getToday = () => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
  };
};

const getWeeksInMonth = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstDayOfWeek = firstDay.getDay();
  const lastDayOfWeek = lastDay.getDay();

  const used = firstDayOfWeek + (lastDay.getDate() - lastDayOfWeek);
  return Math.ceil(used / 7);
};

export default function CalendarBody(): React.ReactElement {
  const [weeksInMonth, setWeeksInMonth] = useState(0);

  useEffect(() => {
    const today = getToday();
    setWeeksInMonth(getWeeksInMonth(today.year, today.month));
  }, []);
  return <div></div>;
}

interface DragInfo {
  isDragging: boolean;
  dragStartDay: number;
  dragStartWeek: number;
  dragEndDay: number;
  dragEndWeek: number;
}

interface Today {
  year: number;
  month: number;
  date: number;
}

interface DayInfo {
  day: number;
  isToday: boolean;
  isHoliday: boolean;
  isPrevMonth: boolean;
  isNextMonth: boolean;
  weekOnMonth: number;
}

interface MonthInfo {
  month: number;
  year: number;
  weeksInMonth: number;
  firstDayOfMonth: number;
  prevMonthLastDate: number;
}

interface WeekInfo {
  firstDayOfWeek: DayInfo;
  lastDayOfWeek: DayInfo;
}
interface Calendar {
  today: Today;
  focusedMonth: MonthInfo;
}
