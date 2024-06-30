import React from 'react';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import AppLayout from './AppLayout';
import CalendarNav from './CalendarNav';

export default function App(): React.ReactElement {
  return (
    <AppLayout
      header={<CalendarHeader />}
      nav={<CalendarNav />}
      main={<CalendarBody />}
    ></AppLayout>
  );
}
