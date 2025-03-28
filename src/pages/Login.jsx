import React from 'react';
import Logo from '../assets/Logo.png';
import KakaoIcon from '../assets/Kakao_icon.png';
import './Login.css';
// 로그인 페이지

function Login() {
  const handleKakaoLogin = () => {
    console.log('카카오톡 로그인 버튼 클릭');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={Logo} alt="Logo" className="logo" />
        <div className="text-space">
          <p>소셜 로그인으로 간편하게 시작하세요.</p>
        </div>
        <button className="kakao-login-button" onClick={handleKakaoLogin}>
          <img src={KakaoIcon} alt="Kakao Login" className="kakao-login-icon" />
          카카오톡으로 로그인
        </button>
      </div>
    </div>
  );
}

export default Login;