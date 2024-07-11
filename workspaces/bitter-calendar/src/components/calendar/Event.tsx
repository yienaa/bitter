import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventContext } from '../../contexts/EventContext';
import { CalendarEvent } from '../../types/event';

const EventElement = styled.div<EventPros>`
  &:not(:first-child) {
    margin-top: 2px;
  }
  height: 20px;
  ${({ id }) => (id ? `background-color: red;` : ``)}
`;
interface EventPros {
  id: string | null;
}

export default function Event({ id }: EventPros): React.ReactElement {
  const { eventEntities, eventDispatch } = useContext(EventContext);
  const [event, setEvent] = useState<CalendarEvent | null>(null);
  useEffect(() => {
    if (id && eventEntities) {
      setEvent(eventEntities.entities[id]);
    } else {
      setEvent(null);
    }
  }, []);

  return <EventElement id={id}>{id && id.substring(0, 4)}</EventElement>;
}
