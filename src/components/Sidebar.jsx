// import {
//     FaHome,
//     FaSignOutAlt,
//     FaPen,
//     FaHeart,
//     FaCommentDots,
//     FaUserCircle,
//   } from 'react-icons/fa';
  
//   export default function Sidebar({ activeTab, setActiveTab }) {
//     return (
//       <div className="sidebar">
//         {/* 로고 영역 */}
//         <div className="logo-container">
//           <img src="/recap.png" alt="Re:cap 로고" className="logo-img" />
//           <span className="logo-text">Re:cap</span>
//         </div>
  
//         {/* 프로필 영역 */}
//         <div className="profile-section">
//           <FaUserCircle className="avatar-icon" />
//           <div className="nickname">
//             <strong>닉네임</strong>
//             <FaPen className="pen-icon" />
//           </div>
//           <hr className="nickname-underline" />
//         </div>
  
//         {/* 메뉴 항목 */}
//         <div className="menu-section">
//           <div className="menu-item">
//             <FaHome />
//             <span>홈으로</span>
//           </div>
//           <div className="menu-item">
//             <FaSignOutAlt />
//             <span>로그아웃</span>
//           </div>
//           <div
//             className={`menu-item ${activeTab === 'comments' ? 'active' : ''}`}
//             onClick={() => setActiveTab('comments')}
//           >
//             <FaCommentDots />
//             <span>작성한 댓글</span>
//           </div>
//           <div
//             className={`menu-item ${activeTab === 'liked' ? 'active' : ''}`}
//             onClick={() => setActiveTab('liked')}
//           >
//             <FaHeart />
//             <span>좋아요 누른 뉴스</span>
//           </div>
//         </div>
  
//         {/* 회원 탈퇴 */}
//         <div className="withdraw">회원 탈퇴</div>
//       </div>
//     );
//   }