// 회원탈퇴 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DeleteAccount.module.css';

function DeleteAccount() {
  const navigate = useNavigate(); 
  const [showConfirmation, setShowConfirmation] = useState(false); // 탈퇴 2중 확인 창 

  const handleDeleteClick = () => {
    setShowConfirmation(true); // "탈퇴" 버튼을 누르면 확인 창을 보여줌
  };

  const handleConfirmDelete = () => {
    // 계정 삭제 로직 여기에 추가
    console.log('계정이 삭제되었습니다!');
    navigate('/successdelete'); // 삭제가 완료되면 "/successdelete" 페이지로 이동동
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false); // 아니요 버튼을 누르면 확인 창을 숨김
  };

  const handleCancelClick = () => {
    console.log('탈퇴가 취소되었습니다.');
    navigate('/'); //탈퇴 취소 시 메인으로 이동
  };

  return (
    <div className={styles.container}>
      <h2>탈퇴하시겠습니까?</h2>
      <p>탈퇴 선택을 하시면 계정은 삭제되며, 복구할 수 없습니다.</p>

      <button className={styles.deleteButton} onClick={handleDeleteClick}>
        탈퇴
      </button>
      <button className={styles.cancelButton} onClick={handleCancelClick}>
        취소
      </button>

      {showConfirmation && (
        <div className={styles.confirmationModal}>
          <p>정말 탈퇴하시겠습니까?</p>
          <div className={styles.confirmationButtons}>
            <button onClick={handleConfirmDelete}>네</button>
            <button onClick={handleCancelDelete}>아니요</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;