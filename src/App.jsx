import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams, useLocation} from 'react-router-dom';
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
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setIsLoggedIn(true);

      // ✅ URL 깔끔하게 정리 (보안 + UX)
      window.history.replaceState({}, document.title, '/');
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
      </RegionProvider>
    </CategoryProvider>
  );
}

export default App;