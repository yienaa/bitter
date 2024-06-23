import React from 'react';
import App from './components/App';
import GlobalStyle from './GlobalStyle';
import { createRoot } from 'react-dom/client';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import './styles/icons/style.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
);
