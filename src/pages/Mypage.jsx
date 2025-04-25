import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CommentList from '../components/CommentList';
import LikedNewsList from '../components/LikedNewsList';
import styles from './MyPage.module.css'; 

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('comments');

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