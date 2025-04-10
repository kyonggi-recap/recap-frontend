import './Sidebar.css';
import logoImg from '../assets/Logo.png';
import avatarImg from '../assets/MyPage_icon.png';
import penIcon from '../assets/pen.png';
import homeIcon from '../assets/home_butten.png';
import logoutIcon from '../assets/logout_butten.png';
import commentIcon from '../assets/comment.png';
import likeIcon from '../assets/good.png';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar">
      {/* 로고 영역 */}
      <div className="logo-container">
        <img src={logoImg} alt="Re:cap 로고" className="logo-img" />
        <span className="logo-text">Re:cap</span>
      </div>

      {/* 프로필 영역 */}
      <div className="profile-section">
        <img src={avatarImg} alt="아바타" className="avatar-circle" />
        <div className="nickname">
          <strong>닉네임</strong>
          <img src={penIcon} alt="수정 아이콘" className="pen-icon" />
        </div>
        <hr className="nickname-underline" />
      </div>

      {/* 메뉴 항목 */}
      <div className="menu-section">
        <div className="menu-item">
          <img src={homeIcon} alt="홈으로" className="menu-icon" />
          <span>홈으로</span>
        </div>
        <div className="menu-item">
          <img src={logoutIcon} alt="로그아웃" className="menu-icon" />
          <span>로그아웃</span>
        </div>
        <div
          className={`menu-item ${activeTab === 'comments' ? 'active' : ''}`}
          onClick={() => setActiveTab('comments')}
        >
          <img src={commentIcon} alt="작성한 댓글" className="menu-icon" />
          <span>작성한 댓글</span>
        </div>
        <div
          className={`menu-item ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          <img src={likeIcon} alt="좋아요 누른 뉴스" className="menu-icon" />
          <span>좋아요 누른 뉴스</span>
        </div>
      </div>

      {/* 회원 탈퇴 */}
      <div className="withdraw">회원 탈퇴</div>
    </div>
  );
}