* 부모에서 자식(host)에 지정해주던 스타일을 사용할 수 없음

  - CSS Modules: CSS 파일을 모듈화하여 클래스 이름이 겹치지 않도록 해주는 기술로, 클래스 이름을 자동으로 생성하여 사용할 수 있게 해줍니다. `styles.module.css` 파일을 생성하여 사용
  - Styled-Components: CSS-in-JS 라이브러리로, 스타일을 컴포넌트와 함께 정의하여 자바스크립트 파일 내에서 직접 관리할 수 있게 해줍니다. 동적인 스타일링과 테마 적용이 편리하여 많은 개발자들이
  선호
  - Emotion: Styled-Components와 비슷한 CSS-in-JS 라이브러리로, 더 빠르고 더 작은 번들을 생성할 수 있음

* Next의 SSR 기능 때문인 것 같은데, 단순 React 테스트가 목적이므로, 'use client' + config > ssr: false 조합을 해놨는데 정석이 뭐지?

* room / toolbar / roomlist 로 나눠지고 그 하위에 엄청 많은 것들이 있을 것 같은데 폴더 구조 어케해야함? 에 대한 추천
    - components/: 컴포넌트들을 기능별로 분리하여 관리합니다.
      • common/: 여러 곳에서 재사용되는 공통 컴포넌트들.
      • room/: Room과 관련된 컴포넌트들.
      • toolbar/: Toolbar와 관련된 컴포넌트들.
      • roomlist/: RoomList와 관련된 컴포넌트들.
    - hooks/: 커스텀 훅을 저장하는 폴더. 데이터 페칭이나 비즈니스 로직을 캡슐화하는 훅들을 이곳에 작성합니다.
      • 예: useRoomData, useToolbarActions, useRoomListData.
    - pages/: Next.js 페이지 컴포넌트를 저장하는 폴더. index.tsx는 홈 페이지, _app.tsx는 글로벌 설정을 위한 파일입니다.
      • 각 페이지 컴포넌트에서 필요한 하위 컴포넌트를 components 폴더에서 임포트하여 사용합니다.
    - styles/: 스타일 파일을 저장하는 폴더.
      • globals.scss: 글로벌 스타일을 정의하는 파일.
      • components/: 컴포넌트별 스타일 파일을 모아두는 폴더. <---- 이건뭐지????????????????????
    - utils/: 유틸리티 함수나 상수들을 저장하는 폴더.
      • api.ts: API 호출 관련 함수들.
      • helpers.ts: 여러 곳에서 사용되는 유틸리티 함수들.
      • constants.ts: 상수 값들.
    - public/: 정적 파일을 저장하는 폴더. 이미지, 아이콘, 폰트 파일 등을 이곳에 저장합니다
