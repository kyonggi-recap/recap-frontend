import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 라우터 이동용
import styles from '../pages/MyPage.module.css';

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

export default function LikedNewsList() {
  const [likedNews, setLikedNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('토큰이 없습니다. 로그인 필요');
      return;
    }
    console.log("🔑 accessToken:", token);

    fetch(`${API_URL}/bff/api/users/liked-news`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("📦 좋아요 뉴스 응답 status:", res.status);
        if (!res.ok) throw new Error('응답 실패');
        return res.json();
      })
      .then((data) => {
        console.log("📄 받아온 좋아요 뉴스 데이터:", data);
        setLikedNews(data.content || []);
      })
      .catch((err) => console.error('좋아요 뉴스 불러오기 실패:', err));
  }, []);

  const totalPages = Math.ceil(likedNews.length / itemsPerPage);
  const displayedNews = likedNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <h2 className={styles.sectionTitle}>좋아요 누른 뉴스</h2>
      <div className={styles.cardContainer}>
        <div className={styles.cardList}>
          {displayedNews.map((item) => (
            <div
              className={styles.newsCard}
              key={item.id}
              onClick={() => navigate(`/news/${item.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {/* ━━━━━━━━━━━━━━━ 상단: 썸네일 + (제목/날짜·통계) ━━━━━━━━━━━━━━━ */}
              <div className={styles.cardTop}>
                {/* ─ 썸네일 ─ */}
                <img
                  src={`${API_URL}/bff/api/image-proxy?url=${encodeURIComponent(item.thumbnailUrl)}`}
                  alt="뉴스 이미지"
                  className={styles.cardImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-thumbnail.png';
                  }}
                />

                {/* ─ 제목 + 날짜·통계 영역 ─ */}
                <div className={styles.cardInfo}>
                  {/* • 제목 (볼드, 왼쪽 정렬) */}
                  <p className={styles.cardTitle}>{item.title}</p>

                  {/* • 날짜(왼쪽) · 통계(오른쪽) 한 행에 배치 */}
                  <div className={styles.cardMetaRow}>
                    <span className={styles.cardDate}>
                      {item.publishedAt?.slice(0, 10).replace(/-/g, '.')}
                    </span>
                    <div className={styles.cardStats}>
                      <span>💬 {item.commentCount}</span>
                      <span>⭐ {item.newsLikeCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ━━━━━━━━━━━━━━━ 구분선 ━━━━━━━━━━━━━━━ */}
              <hr className={styles.cardDivider} />
            </div>
          ))}
        </div>

        {/* ━━━━━━━━━━━━━━━ 페이지네이션 ━━━━━━━━━━━━━━━ */}
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
