import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import NewsPortal from "./pages/NewsPortal";

function App() {

  return (
    
    <Routes>
      <Route path="/" element={<NewsPortal />} />
    </Routes>
    
   
  );
}

export default App
