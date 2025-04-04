// pages/MyPage.jsx
import { useState } from 'react';
// import Sidebar from '../components/Sidebar';
import CommentList from '../components/CommentList';
import LikedNewsList from '../components/LikedNewsList';
import './MyPage.css';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('comments');

  return (
    <div className="mypage-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mypage-content">
        {activeTab === 'comments' && <CommentList />}
        {activeTab === 'liked' && <LikedNewsList />}
      </div>
    </div>
  );
}