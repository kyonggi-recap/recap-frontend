import Logo from '../assets/Logo.png';
import KakaoIcon from '../assets/kakao_login.png';
import styles from './Login.module.css';
// 로그인 페이지

function Login() {
  const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

  const link = `${API_URL}/oauth2/authorization/kakao` 
  
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