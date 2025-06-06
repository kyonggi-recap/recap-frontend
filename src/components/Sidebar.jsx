import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import logoImg from '../assets/Logo.png';
import homeIcon from '../assets/home_butten.png';
import logoutIcon from '../assets/logout_butten.png';
import commentIcon from '../assets/comment.png';
import likeIcon from '../assets/good.png';
import interestIcon from '../assets/interest.png';

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('로딩중...');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    fetch(`${API_URL}/bff/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('🙋‍♀️ 유저 정보:', data);
        setNickname(data.nickname || '알 수 없음');
        setImageUrl(data.imageUrl || '');
      })
      .catch(err => {
        console.error('유저 정보 불러오기 실패:', err);
        setNickname('알 수 없음');
      });
  }, []);

  const handleLogout = () => {
    console.log("🧼 로그아웃 함수 실행됨");
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <div className={styles.sidebar}>

      {/* 프로필 영역 */}
      <div className={styles.profileSection}>
        <img
          src={imageUrl || '/default-thumbnail.png'}
          alt="아바타"
          className={styles.avatarCircle}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-thumbnail.png';
          }}
        />
        <div className={styles.nickname}>
          <strong>{nickname}</strong>
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
