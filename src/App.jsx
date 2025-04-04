import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import NewsPortal from "./pages/NewsPortal";
import React from "react";
import './App.css'
import Header from './components/Header'
import Mypage from './pages/Mypage'; 
import SearchNews from './pages/SearchNews';
import Login from './pages/Login';
import Home from './pages/Home' //여긴 홈 화면


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  return (
    <>
    <div>
      <Header isLoggedIn={isLoggedIn} /> {/* isLoggedIn prop 전달 만약, 로그인 상태 확인 */}
        <Routes>
          <Route path="/home" element={<Home />} /> 
          <Route path="/search" element={<SearchNews />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<NewsPortal />} />

          {/* 다른 라우트들을 추가할 수 있습니다. */}
        </Routes>
    </div>
    {/* <Header/> 
    <div>
      <h1>테스트</h1>
    </div> */}
    </>
  )
}

export default App
