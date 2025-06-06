import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 내부 라우팅용 추가
import styles from '../pages/MyPage.module.css';

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

export default function CommentList() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('❗토큰이 없습니다. 로그인 필요');
      return;
    }
    console.log("🔑 accessToken:", token);
    fetch(`${API_URL}/bff/api/users/comments`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("📦 댓글 API 응답 status:", res.status);
        if (!res.ok) throw new Error('댓글 불러오기 실패');
        return res.json();
      })
      .then((data) => {
        console.log("📄 받아온 댓글 데이터:", data);
        setComments(data.content || []);
      })
      .catch((err) => console.error('댓글 불러오기 실패:', err));
  }, []);

  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const displayedComments = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <h2 className={styles.sectionTitle}>작성한 댓글</h2>
      <div className={styles.cardContainer}>
        <div className={styles.cardList}>
          {displayedComments.map((item) => {
            console.log("🧾 댓글 아이템:", item);
            return (
              <div
                className={styles.newsCard}
                key={item.id}
                onClick={() => navigate(`/news/${item.newsId}`)} // ✅ 내부 이동
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={item.thumbnailUrl}
                  alt="뉴스 이미지"
                  className={styles.cardImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-thumbnail.png';
                  }}
                />
                <div className={styles.cardText}>
                  <p className={styles.cardTitle}>{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.pagination}>
          <span
            className={styles.pageNumber}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            {'<'}
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i + 1}
              className={`${styles.pageNumber} ${
                currentPage === i + 1 ? styles.active : ''
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span
            className={styles.pageNumber}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          >
            {'>'}
          </span>
        </div>
      </div>
    </>
  );
}