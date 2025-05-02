import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import logoImg from '../assets/Logo.png';
import avatarImg from '../assets/MyPage_icon.png';
import penIcon from '../assets/pen.png';
import homeIcon from '../assets/home_butten.png';
import logoutIcon from '../assets/logout_butten.png';
import commentIcon from '../assets/comment.png';
import likeIcon from '../assets/good.png';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
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
          <strong>닉네임</strong>
          <img src={penIcon} alt="수정 아이콘" className={styles.penIcon} />
        </div>
        <hr className={styles.nicknameUnderline} />
      </div>

      {/* 메뉴 항목 */}
      <div className={styles.menuSection}>
        <div className={styles.menuItem}>
          <img src={homeIcon} alt="홈으로" className={styles.menuIcon} />
          <span>홈으로</span>
        </div>
        <div className={styles.menuItem}>
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
      </div>

      {/* 회원 탈퇴 */}
      <div className={styles.withdraw}
           onClick={() => navigate('/deleteaccount')}>회원 탈퇴</div>
      </div>
  );
}
