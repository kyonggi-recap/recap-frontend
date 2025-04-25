// 회원탈퇴 성공 페이지
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SuccessDelete.module.css';
import CheckIcon from '../assets/Check.png'
function SuccessDelete() {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate('/'); 
  };

  return (
    <div className={styles.container}>
      <h1>탈퇴되었습니다!</h1>
      <img src={CheckIcon} alt="탈퇴 완료" className={styles.checkIcon} />
      <button className={styles.mainButton} onClick={handleGoToMain}>
        메인 화면으로
      </button>
    </div>
  );
}

export default SuccessDelete;