import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import logoImg from '../assets/Logo.png';
import avatarImg from '../assets/MyPage_icon.png';
import homeIcon from '../assets/home_butten.png';
import logoutIcon from '../assets/logout_butten.png';
import commentIcon from '../assets/comment.png';
import likeIcon from '../assets/good.png';
import interestIcon from '../assets/interest.png';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    setUserId(storedId);
  }, []);

  const handleLogout = () => {
    console.log("🧼 로그아웃 함수 실행됨");
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    alert('로그아웃 되었습니다.');
    navigate('/'); // 메인으로 이동
  };

  return (
    <div className={styles.sidebar}>
      {/* 로고 영역 */}
      <div className={styles.logoContainer}>
        <img src={logoImg} alt="Re:cap 로고" className={styles.logoImg} />
        <span className={styles.logoText}>Re:cap</span>
      </div>

      {/* 프로필 영역 */}
      <div className={styles.profileSection}>
        <img src={avatarImg} alt="아바타" className={styles.avatarCircle} />
        <div className={styles.nickname}>
          <strong>{`유저 ${userId}`}</strong>
        
        </div>
        <hr className={styles.nicknameUnderline} />
      </div>

      {/* 메뉴 항목 */}
      <div className={styles.menuSection}>
        <div className={styles.menuItem} onClick={() => navigate('/')}>
          <img src={homeIcon} alt="홈으로" className={styles.menuIcon} />
          <span>홈으로</span>
        </div>
        <div className={styles.menuItem} onClick={handleLogout}>
          <img src={logoutIcon} alt="로그아웃" className={styles.menuIcon} />
          <span>로그아웃</span>
        </div>
        <div
          className={`${styles.menuItem} ${activeTab === 'comments' ? styles.menuItemActive : ''}`}
          onClick={() => setActiveTab('comments')}
        >
          <img src={commentIcon} alt="작성한 댓글" className={styles.menuIcon} />
          <span>작성한 댓글</span>
        </div>
        <div
          className={`${styles.menuItem} ${activeTab === 'liked' ? styles.menuItemActive : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          <img src={likeIcon} alt="좋아요 누른 뉴스" className={styles.menuIcon} />
          <span>좋아요 누른 뉴스</span>
        </div>
        <div className={styles.menuItem} onClick={() => navigate('/interest')}>
          <img src={interestIcon} alt="관심분야 설정" className={styles.menuIcon} />
          <span>관심분야 설정</span>
        </div>
      </div>

      {/* 회원 탈퇴 */}
      <div className={styles.withdraw} onClick={() => navigate('/deleteaccount')}>
        회원 탈퇴
      </div>
    </div>
  );
}
