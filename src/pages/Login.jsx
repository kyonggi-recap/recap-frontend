import React from 'react';
import Logo from '../assets/Logo.png';
import KakaoIcon from '../assets/kakao_login.png';
import styles from './Login.module.css';
import { Navigate } from 'react-router-dom';
// 로그인 페이지

function Login() {
  const link = 'http://localhost:8080/oauth2/authorization/kakao' //나중에 환경에 따라 local말고 client 환경에 따라 바뀌어야함. 

  const handleKakaoLogin = () => { 
    window.location.href = link;
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_card}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <div className={styles.text_space}>
          <p>소셜 로그인으로 간편하게 시작하세요.</p>
        </div>
          <img src={KakaoIcon} alt="Kakao Login" className={styles.kakao_login} onClick={handleKakaoLogin} />
      </div>
    </div>
  );
}

export default Login;