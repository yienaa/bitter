export const theme = {
  colors: {
    // 주요 브랜드 컬러
    primary: {
      main: '#1A73E8',     // 메인 브랜드 컬러
      light: '#4285F4',    // 밝은 버전
      dark: '#1557B0',     // 어두운 버전
    },

    // 그레이스케일
    gray: {
      50: '#F8F9FA',      // 배경색
      100: '#F1F3F4',     // 구분선, 비활성 배경
      200: '#E8EAED',     // 보조 배경
      300: '#DADCE0',     // 보더
      400: '#BDC1C6',     // 비활성 텍스트
      500: '#9AA0A6',     // 보조 텍스트
      600: '#5F6368',     // 본문 텍스트
      700: '#3C4043',     // 제목 텍스트
      800: '#202124',     // 강조 텍스트
    },

    // 상태 표시
    state: {
      error: '#D93025',    // 에러
      warning: '#F29900',  // 경고
      success: '#1E8E3E',  // 성공
      info: '#1A73E8',     // 정보
    },

    // 기능성 컬러
    functional: {
      overlay: 'rgba(0, 0, 0, 0.5)',  // 모달 오버레이
      hover: 'rgba(26, 115, 232, 0.1)',// 호버 효과
      focus: 'rgba(26, 115, 232, 0.2)', // 포커스 효과
      disabled: 'rgba(60, 64, 67, 0.12)', // 비활성화 상태
    }
  },

  // 그림자 효과
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },

  // 반응형 브레이크포인트
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  }
};

// 타입스크립트 타입 정의
export type Theme = typeof theme; 