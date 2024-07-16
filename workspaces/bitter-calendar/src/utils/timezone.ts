import { Dayjs } from 'dayjs';

export function getTimezone() {
  return new Dayjs().format('Z');
}
