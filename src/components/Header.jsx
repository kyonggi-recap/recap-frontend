// 헤더
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import SearchIcon from '../assets/Search_icon.png';
import MyPageIcon from '../assets/MyPage_icon.png';
import styles from './Header.module.css';

function Header({ isLoggedIn }) { // isLoggedIn prop 받기
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchKeyword.trim()) {
      const query = `/search?keyword=${encodeURIComponent(searchKeyword)}`;
      navigate(query);
      setIsSearchVisible(false);
      setSearchKeyword("");
    }
  };

  const handleMypageIconClick = () => {
    if (isLoggedIn) {
      navigate('/mypage'); // 로그인 상태이면 마이페이지로 이동
    } else {
      navigate('/login'); // 로그인 상태가 아니면 로그인 페이지로 이동
    }
  };

  const handleLogoIconClick =() => {
    navigate('/'); 
  }

  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo" className={styles.header_logo} onClick={handleLogoIconClick}/>
      <div className={styles.icons}>
        <img
          src={SearchIcon}
          alt="Search"
          className={`${styles.icon} ${styles.search_icon}`}
          onClick={handleSearchIconClick}
        />
        <img
          src={MyPageIcon}
          alt="My Page"
          className={`${styles.icon} ${styles.mypage_icon}`}
          onClick={handleMypageIconClick}
        />
      </div>
      {isSearchVisible && (
        <form onSubmit={handleSearch} className={styles.search_form}>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="검색어를 입력하세요."
            className={styles.search_input}
          />
          <button type="submit" className={styles.search_button}>검색</button>
        </form>
      )}
    </header>
  );
}

export default Header;