import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NewsPortal from "./pages/NewsPortal";
import './App.css';
import Header from './components/Header';
import Mypage from './pages/Mypage';
import SearchNews from './pages/SearchNews';
import Login from './pages/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import NewsDetail from './pages/NewsDetail';
import { CategoryProvider } from './components/CategoryContext';
import { RegionProvider } from './components/RegionContext';
import DeleteAccount from './pages/DeleteAccount';
import SuccessDelete from './pages/SuccessDelete';
import InterestSelector from './pages/InterestSelector';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let accessToken = params.get('accessToken');
    let refreshToken = params.get('refreshToken');

    // ✅ URL에 없으면 localStorage에서 가져오기
    if (!accessToken) accessToken = localStorage.getItem('accessToken');
    if (!refreshToken) refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const userId = payload.userId || payload.id || payload.sub;
        if (userId) {
          localStorage.setItem('userId', userId.toString());
          console.log("🔐 userId 저장됨:", userId);
        } else {
          console.warn("❗ accessToken에 userId 없음. payload:", payload);
        }
      } catch (e) {
        console.error('❌ 토큰 디코딩 실패:', e);
      }

      setIsLoggedIn(true);

      // ✅ URL 깔끔하게 정리 (보안 + UX)
      if (params.get('accessToken') || params.get('refreshToken')) {
        window.history.replaceState({}, document.title, '/');
      }
    } else {
      const stored = localStorage.getItem('accessToken');
      if (stored) {
        setIsLoggedIn(true);
      }
    }
  }, [location]);

  return (
    <CategoryProvider>
      <RegionProvider>
      <div className='app-container'>
        <Header isLoggedIn={isLoggedIn} />
        <Navbar />
        <div className='content-wrapper'>
          <Routes>
            <Route path="/" element={<NewsPortal />} />
            <Route path="/search" element={<SearchNews />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/deleteaccount" element={<DeleteAccount />} />
            <Route path="/successdelete" element={<SuccessDelete />} />
            <Route path="/interest" element={<InterestSelector />} />
          </Routes>
        </div>
        <Footer />
      </div>
      </RegionProvider>
    </CategoryProvider>
  );
}

export default App;