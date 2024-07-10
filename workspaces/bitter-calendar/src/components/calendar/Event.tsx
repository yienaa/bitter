import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventContext } from '../../contexts/EventContext';
import { CalendarEvent } from '../../types/event';

const EventElement = styled.div<EventPros>`
  height: 20px;
  ${({ eventKey }) => (eventKey ? `background-color: red;` : ``)}
`;
interface EventPros {
  eventKey: string | null;
}

export default function Event({ eventKey }: EventPros): React.ReactElement {
  const { rawEvent, eventDispatch } = useContext(EventContext);
  const [event, setEvent] = useState<CalendarEvent | null>(null);
  useEffect(() => {
    if (eventKey && rawEvent) {
      setEvent(rawEvent[eventKey]);
    } else {
      setEvent(null);
    }
  }, []);

  return <EventElement eventKey={eventKey}>{eventKey && 'Event'}</EventElement>;
}
