import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/theme';

// TODO: 여기서 레이아웃 요소 모두 스타일링

const Layout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 200px calc(100% - 200px);
  grid-template-rows: 60px calc(100% - 60px);
  grid-template-areas:
    'header header'
    'side-bar main';
`;
const Header = styled.div`
  grid-area: header;
  padding: 10px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid ${colors.border};
`;

const Nav = styled.div`
  grid-area: side-bar;
  padding: 10px;
  border-right: 1px solid ${colors.border};

  // TODO: 작은 달력 스타일링
  // 화면 800px 이하일 경우 스르륵 사라짐
  // 화면 800px 이상일 경우 스르륵 나타남
`;

const Body = styled.div`
  grid-area: main;
  flex: 1;
  min-width: 600px;
  display: flex;
  flex-direction: column;
`;

export interface LayoutProps {
  header: React.ReactElement;
  nav: React.ReactElement;
  main: React.ReactElement;
}

export default function AppLayout({ header, nav, main }: LayoutProps): React.ReactElement {
  return (
    <Layout>
      <Header>{header}</Header>
      <Nav>{nav}</Nav>
      <Body>{main}</Body>
    </Layout>
  );
}
