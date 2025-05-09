import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import NewsPortal from "./pages/NewsPortal";
import './App.css';
import Header from './components/Header';
import Mypage from './pages/Mypage';
import SearchNews from './pages/SearchNews';
import Login from './pages/Login';
import Footer from './components/Footer';
import axios from 'axios';
import Navbar from './components/Navbar';
import NewsDetail from './pages/NewsDetail';
import { CategoryProvider } from './components/CategoryContext';
import DeleteAccount from './pages/DeleteAccount';
import SuccessDelete from './pages/SuccessDelete';
import InterestSelector from './pages/InterestSelector';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tokenFromQuery = searchParams.get('token');
  
    const handleLoginWithToken = async () => {
      if (tokenFromQuery) {
        try {
          const response = await axios.post('http://15.164.211.206:8080/bff/api/auth/token', {
            token: tokenFromQuery,
          });
  
          const { accessToken, refreshToken } = response.data;
  
          document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict`;
          document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict`;
  
          setIsLoggedIn(true);
          navigate('/');
          window.location.reload(); // 즉시 로그인 상태 반영
        } catch (err) {
          console.error('토큰 로그인 실패:', err);
          setIsLoggedIn(false);
          navigate('/login');
        }
      } else {
        const accessToken = getAccessToken();
        if (accessToken) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    };
  
    handleLoginWithToken();
  }, [searchParams, navigate]);

  const getAccessToken = () => {
    return document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
  };

  return (
    <CategoryProvider>
      <div>
        <Header isLoggedIn={isLoggedIn} />
        <Navbar />
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
        <Footer />
      </div>
    </CategoryProvider>
  );
}

export default App;
