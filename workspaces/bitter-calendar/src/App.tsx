import React from 'react';
import AppLayout from './AppLayout';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarNav from './calendar/CalendarNav';
import CalendarBody from './calendar/CalendarBody';
export default function App(): React.ReactElement {
  return (
    <AppLayout
      header={<CalendarHeader />}
      nav={<CalendarNav />}
      main={<CalendarBody />}
    ></AppLayout>
  );
}
