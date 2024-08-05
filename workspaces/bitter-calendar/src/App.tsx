import React from 'react';
import AppLayout from './AppLayout';
import CalendarHeader from './components/calendar/CalendarHeader';
import CalendarNav from './components/calendar/CalendarNav';
import CalendarBody from './components/calendar/CalendarBody';

export default function App(): React.ReactElement {
  return (
    <AppLayout
      header={<CalendarHeader />}
      nav={<CalendarNav />}
      main={<CalendarBody />}
    ></AppLayout>
  );
}
