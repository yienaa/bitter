export const UI_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export const UI_COLOR = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
} as const;

export const UI_VARIANT = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  TEXT: 'text',
} as const;

export type UiSize = (typeof UI_SIZE)[keyof typeof UI_SIZE];
export type UiColor = (typeof UI_COLOR)[keyof typeof UI_COLOR];
export type UiVariant = (typeof UI_VARIANT)[keyof typeof UI_VARIANT];
