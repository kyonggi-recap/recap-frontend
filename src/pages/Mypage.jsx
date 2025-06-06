import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CommentList from '../components/CommentList';
import LikedNewsList from '../components/LikedNewsList';
import styles from './MyPage.module.css'; 

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('comments');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.content}>
        {activeTab === 'comments' && <CommentList />}
        {activeTab === 'liked' && <LikedNewsList />}
      </div>
    </div>
  );
}
