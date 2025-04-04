import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NewsDetail from './pages/NewsDetail';
import MyPage from './pages/MyPage';
import './components/Footer.css'; 
import './components/Navbar.css';
import './App.css';

function App() {
  const location = useLocation();
  const isMyPage = location.pathname.startsWith('/mypage'); 

  return (
    <>
      {!isMyPage && <Navbar />}
      <div className="app">
        <main className="content">
          <Routes>
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </main>
      </div>
      {!isMyPage && <Footer />}
    </>
  );
}

export default App;










