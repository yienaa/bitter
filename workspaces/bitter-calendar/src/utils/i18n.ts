export function getDateFormat(date: number | Date | undefined, locale: string = 'ko-KR') {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
  }).format(date);
}
export function getMonthFormat(date: number | Date | undefined, locale: string = 'ko-KR') {
  return new Intl.DateTimeFormat(locale, {
    month: 'numeric',
  }).format(date);
}

export function getYearFormat(date: number | Date | undefined, locale: string = 'ko-KR') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
  }).format(date);
}
