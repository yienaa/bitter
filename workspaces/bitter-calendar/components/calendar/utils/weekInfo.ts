export function weekInfo(year: number, month: number, week: number) {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const weeksInMonth = getWeeksInMonth(year, month);
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  const firstDayOfWeek = getFirstDayOfWeek(year, month, week);
  const lastDayOfWeek = getLastDayOfWeek(year, month, week);

  return {
    month,
    year,
    week,
    weeksInMonth,
    firstDayOfMonth,
    prevMonthLastDate,
    firstDayOfWeek,
    lastDayOfWeek,
  };
}

export function getWeeksInMonth(year: number, month: number): number {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstDayOfWeek = firstDay.getDay();
  const lastDayOfWeek = lastDay.getDay();

  const used = firstDayOfWeek + (lastDay.getDate() - lastDayOfWeek);
  return Math.ceil(used / 7);
}

export function getFirstDayOfWeek(year: number, month: number, week: number): number {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  const firstDayOfWeek = (week - 1) * 7 - firstDayOfMonth + 1;

  return firstDayOfWeek <= 0 ? prevMonthLastDate + firstDayOfWeek : firstDayOfWeek;
}

export function getLastDayOfWeek(year: number, month: number, week: number): number {
  const weeksInMonth = getWeeksInMonth(year, month);
  const lastDayOfWeek = getFirstDayOfWeek(year, month, week) + 6;

  return lastDayOfWeek > weeksInMonth * 7 ? lastDayOfWeek - weeksInMonth * 7 : lastDayOfWeek;
}
