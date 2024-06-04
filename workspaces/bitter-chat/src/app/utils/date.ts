export const YEAR_FORMAT = {
  YYYY: 'numeric',
  YY: '2-digit',
} as const;

export const MONTH_FORMAT = {
  MM: '2-digit',
  M: 'numeric',
  mm: '2-digit',
  m: 'short',
} as const;

export const DAY_FORMAT = {
  DD: '2-digit',
  D: 'numeric',
} as const;

export const HOUR_FORMAT = {
  HH: '2-digit',
  H: 'numeric',
} as const;

export const MINUTE_FORMAT = {
  mm: '2-digit',
  m: 'numeric',
} as const;

export interface BitterDateFormatter {
  type: 'full' | 'short';
  year: keyof typeof YEAR_FORMAT;
  month: keyof typeof MONTH_FORMAT;
  day: keyof typeof DAY_FORMAT;
  hour: keyof typeof HOUR_FORMAT;
  minute: keyof typeof MINUTE_FORMAT;
}

export default function BitterDate(
  timestamp: number,
  format: BitterDateFormatter = {
    type: 'full',
    year: 'YYYY',
    month: 'MM',
    day: 'DD',
    hour: 'HH',
    minute: 'mm',
  },
): string {
  if (format.type === 'short') {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: format ? HOUR_FORMAT[format.hour] : '2-digit',
      minute: format ? MINUTE_FORMAT[format.minute] : '2-digit',
    }).format(new Date(timestamp));
  }
  return new Intl.DateTimeFormat('ko-KR', {
    year: format ? YEAR_FORMAT[format.year] : '2-digit',
    month: format ? MONTH_FORMAT[format.month] : '2-digit',
    day: format ? DAY_FORMAT[format.day] : '2-digit',
    hour: format ? HOUR_FORMAT[format.hour] : '2-digit',
    minute: format ? MINUTE_FORMAT[format.minute] : '2-digit',
  }).format(new Date(timestamp));
}
