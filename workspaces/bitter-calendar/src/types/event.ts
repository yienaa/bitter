import { ISODateString } from './calendar';
// hover
// drag
// click
// resize

export const EVENT_TYPES = {
  HOVER: 'hover',
  // DRAG: 'drag',
  // CLICK: 'click',
  // RESIZE: 'resize',
} as const;
export type EventHandleType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];
export interface EventTyps {
  type: EventHandleType;
  payload: any;
}