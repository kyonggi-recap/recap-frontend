import React, {useEffect} from 'react';
import Logo from '../assets/Logo.png';
import KakaoIcon from '../assets/kakao_login.png';
import styles from './Login.module.css';
import { useNavigate,useSearchParams } from 'react-router-dom';
import axios from 'axios';
// 로그인 페이지

function Login() {
  const link = 'http://15.164.211.206:8080/oauth2/authorization/kakao' 

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleKakaoLogin = () => {  
    window.location.href = link;
  };

  useEffect(() => {
    const tokenFromQuery = searchParams.get('token');
    if (tokenFromQuery) {
      // 백엔드에 token 전달 → access & refresh token 받기
      axios.post('http://15.164.211.206:8080/bff/api/auth/token', {
        token: tokenFromQuery,
      })
      .then((response) => {
        const { accessToken, refreshToken } = response.data;

        // 쿠키에 저장
        document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict`;
        document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict`;

        // 메인페이지로 이동 및 상태 반영을 위한 새로고침
        navigate('/');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Token exchange failed', error);
        alert('로그인에 실패했습니다.');
      });
    }
  }, [searchParams, navigate]);

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