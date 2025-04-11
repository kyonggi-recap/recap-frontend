import React, { useState,useEffect } from 'react'
import { Routes,Route, useNavigate} from 'react-router-dom'
import NewsPortal from "./pages/NewsPortal"; //메인화면
import './App.css' // 아직 안씀
import Header from './components/Header'
import Mypage from './pages/Mypage'; 
import SearchNews from './pages/SearchNews';
import Login from './pages/Login';
import Footer from './components/Footer';
import axios from 'axios';
import Navbar from './components/Navbar';
import NewsDetail from './pages/NewsDetail';
import DeleteAccount from'./pages/DeleteAccount';
import SuccessDelete from './pages/SuccessDelete';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = getAccessToken();
      if (accessToken) {
        try {
          // 서버에 토큰 검증 요청
          // await axios.get('/api/verify', {
          //   headers: {
          //     Authorization: `Bearer ${accessToken}`,
          //   },
          // });
          setIsLoggedIn(true);
        } catch (error) {
          // 토큰이 유효하지 않거나 만료된 경우
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const getAccessToken = () => {
    // 쿠키에서 액세스 토큰 가져오기
    return document.cookie.replace(/(accessToken=)([^;]*);?/, '$2');
  };

  // const refreshAccessToken = async () => {
  //   try {
  //     const refreshToken = getRefreshToken();
  //     const response = await axios.post('/api/refresh', {
  //       refreshToken: refreshToken,
  //     });  
  //     // 새로운 액세스 토큰 저장
  //     document.cookie = `accessToken=${response.data.accessToken}; path=/; secure; httponly; samesite=strict`;
  //     return response.data.accessToken;
  //   } catch (error) {
  //     console.error(error);
  //     // 로그인 페이지로 이동
  //     navigate('/login');
  //     return null;
  //   }
  // };

  // const getRefreshToken = () => {
  //   // 쿠키에서 리프레시 토큰 가져오기
  //   return document.cookie.replace(/(refreshToken=)([^;]*);?/, '$2');
  // };

  // const handleApiRequest = async (url, options = {}) => {
  //   let accessToken = getAccessToken();
  //   if (!accessToken) {
  //     navigate('/login');
  //     return null;
  //   }

  //   try {
  //     const response = await axios(url, {
  //       ...options,
  //       headers: {
  //         ...options.headers,
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       // 액세스 토큰 만료
  //       const newAccessToken = await refreshAccessToken();
  //       if (newAccessToken) {
  //         return handleApiRequest(url, options); // 재시도
  //       }
  //     }
  //     throw error;
  //   }
  // };

  return (
    <>
    <div>
      <Header isLoggedIn={isLoggedIn} /> {/* isLoggedIn prop 전달 만약, 로그인 상태 확인 */}
      <Navbar/>
        <Routes>
          <Route path="/" element={<NewsPortal />} /> 
          <Route path="/search" element={<SearchNews />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/deleteaccount" element={<DeleteAccount />} />
          <Route path="/successdelete" element={<SuccessDelete />} />
        </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App