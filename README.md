# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


// 여기서부터 한 작업입니다.
node.js 설치. (node 버전 : 22.14.0 / npm 버전 : 10.9.2 )
바탕 화면에 리액트 폴더 하나 만들기 (이름은 소문자로) vscode에서 해당 폴더 열고, 터미널 열기(ctrl + j )
터미널에 npm create vite@latest 입력

- y 누르라고 뜨면 y 입력
- 리액트 폴더 안에 프로젝트 이름 정하기. (프로젝트 이름은 영어 소문자로만, "\_" (언더바)사용 금지 "-" 만 인식함.
- React 선택
- javascript 선택
  -> 이후, 만든 폴더를 열어서 터미널 새로 실행하기.
- npm i (관련 라이브러리 설치)
- npm run dev (서버 실행)

확장에서 eslint 설치 ( 오류가 날 코드를 vscode에서 실행하기 전에 경고를 해줌. )

- esling.config.js 에서
  rules에 "no-unused-vars":"off", // 사용하지 않는 변수들을 오류로 알려주지 않게 해줌.
  "react/prop-types":"off" // 리액트를 안전하게 사용할 수 있게 해주는 옵션을 꺼줌.
  추가.

확장에서 prettier code 설치 ( 저장하면 줄바꿈 같은거 바로 해줌 . )

- 추가로, 설치 후 ctrl + , 를 눌러서 설정을 바꿔야함
  -> 검색창에 format on save 검색하고, 체크해야 사용 가능.

확장에서 material Icon 설치 ( 아이콘을 구별하기 쉽게 직관적을 바꿔줌)

확장에서 error lens 설치 ( 코드 오류가 어떤 오류인지 자세히 알려줌)

- src에 폴더 components 만들기.
- assests와 public에 있는 svg 파일 다 지우기.
- App.css와 index.css 내용 지우기.
- main.jsx에서 StrictMode 지우기 ( 난 주석 처리 해버림. 이게 개발자 모드에서 사용하는데, 마운트 시 프로젝트를 2번 실행함. 헷갈리게 만듦 )

router 설치

- npm i react-router-dom
- npm i axios 
- src에 폴더 pages 만들기 (페이지 모아놓는 파일)
- main.jsx에 <App/>을 <BrowserRouter>로 묶기.
- // !!!!!!!!!!!! 중요 !!!!!!!!!!여기서 App.jsx에 Router을 사용 안하면 오류뜨니, Router 작성 외에는 주석 처리 할 것!!
- App.jsx 에서 import { Routes,Route,Link } from 'react-router-dom' //작성
  // Link는 a 태그 처럼 페이지 이동을 도와줌.
