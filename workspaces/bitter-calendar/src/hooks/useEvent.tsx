import { useState } from 'react';

export const EVENT_HANDLE_TYPE = {
  HOVER: 'hover',
  DRAG: 'drag',
  CLICK: 'click',
  RESIZE: 'resize',
};
type EventHandleMap = { [key: string]: string };
export function useEventHandle() {
  const [events, setEvents] = useState([]);
}

// hover
// drag
// click
// resize
