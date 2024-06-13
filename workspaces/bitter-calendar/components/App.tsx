import React from 'react';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';

export default function App(): React.ReactElement {
  return (
    <div>
      <CalendarHeader />
      <CalendarBody />
    </div>
  );
}
