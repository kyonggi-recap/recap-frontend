import './components/Footer.css'; 
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './components/Navbar.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NewsDetail from './pages/NewsDetail'; 
function App() {
  return (
    <> 
    <Navbar />
    <div className="app">
    <main className="content">
    <Routes>

            <Route path="/news/:id" element={<NewsDetail />} />
          </Routes>
    </main>
    
  </div>
  <Footer />
  </>
   
  
 

   
    
  );
}

export default App;