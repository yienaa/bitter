import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import AppLayout from './AppLayout';
import CalendarHeader from './components/calendar/CalendarHeader';
import CalendarNav from './components/calendar/CalendarNav';
import CalendarBody from './components/calendar/CalendarBody';

export default function App(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout
        header={<CalendarHeader />}
        nav={<CalendarNav />}
        main={<CalendarBody />}
      ></AppLayout>
    </ThemeProvider>
  );
}
