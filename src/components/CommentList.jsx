import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../pages/MyPage.module.css';

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

export default function CommentList() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('❗토큰이 없습니다. 로그인 필요');
      return;
    }
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
          {displayedComments.map((item) => (
            <div className={styles.newsCard} key={item.commentId}>

              {/* ━━━━ 상단: 썸네일 + (제목 / 날짜·통계) ━━━━ */}
              <div
                className={styles.cardTop}
                onClick={() => navigate(`/news/${item.newsId}`)}
              >
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
                  {/* • 제목 (굵게, 왼쪽 정렬) */}
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

              {/* ━━━━ 구분선 ━━━━ */}
              <hr className={styles.cardDivider} />

              {/* ━━━━ 하단: 닉네임 · 댓글 날짜 / 댓글 내용 / 좋아요·싫어요 ━━━━ */}
              <div className={styles.commentBox}>
                {/* 닉네임 · 댓글 작성 날짜 */}
                <div className={styles.commentMeta}>
                  <span>{item.nickname}</span>
                  <span>
                    {item.createdDate?.slice(0, 10).replace(/-/g, '.')}
                  </span>
                </div>

                {/* 댓글 내용 (앞에 “└ ” 붙임) */}
                <div className={styles.commentContent}>
                  └ {item.commentContent}
                </div>

                {/* 좋아요·싫어요 */}
                <div className={styles.commentReactions}>
                  <span>👍 {item.commentLikeCount}</span>
                  <span>👎 {item.commentDislikeCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─ 페이지네이션 ─ */}
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
