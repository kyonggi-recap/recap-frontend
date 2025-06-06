import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetail.css';

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [articleLikes, setArticleLikes] = useState(0);
  const [articleLiked, setArticleLiked] = useState(false);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [userActions, setUserActions] = useState({});
  const menuRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/bff/api/news/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('📰 전체 응답 데이터:', data);
        console.log('📄 뉴스 데이터:', data.news);
        console.log('💬 댓글 목록:', data.comments);
        setNews(data.news);
        setComments(data.comments || []);
        setArticleLikes(data.news.likeCount || 0);
      })
      .catch(err => console.error('뉴스 불러오기 실패:', err));
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleWriteComment = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!newComment.trim()) return;

    fetch(`${API_URL}/bff/api/comments?newsId=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newComment }),
    })
      .then(async res => {
        if (!res.ok) {
          const errText = await res.text();
          console.error('❌ 댓글 등록 실패:', errText);
          return;
        }
        const data = await res.json();
        console.log('✅ 댓글 등록 응답:', data);
        setComments([...comments, data]);
        setNewComment('');
      })
      .catch(err => console.error('댓글 작성 실패:', err));
  };

  const handleLike = (commentId, isLike = true) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    alert('로그인이 필요합니다.');
    return;
  }
  if (!commentId) return;

  const key = `${commentId}_${isLike ? 'like' : 'dislike'}`;
  const alreadyClicked = userActions[key];

  fetch(`${API_URL}/bff/api/recommend/comments/${commentId}/${isLike ? 'like' : 'dislike'}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(() => {
      console.log(`✅ ${isLike ? '좋아요' : '싫어요'} 요청 성공`, commentId);
      console.log('🧩 이전 클릭 상태:', alreadyClicked);

      setComments(prev =>
        prev.map(c => {
          if (c.id !== commentId) return c;
          const updated = {
            ...c,
            likeCount: isLike
              ? (c.likeCount || 0) + (alreadyClicked ? -1 : 1)
              : c.likeCount,
            dislikeCount: !isLike
              ? (c.dislikeCount || 0) + (alreadyClicked ? -1 : 1)
              : c.dislikeCount,
          };
          console.log('🛠️ 업데이트된 댓글:', updated);
          return updated;
        })
      );

      setUserActions(prev => ({ ...prev, [key]: !alreadyClicked }));
    })
    .catch(err => console.error('좋아요/싫어요 실패:', err));
};

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
    setMenuOpenIndex(null);
  };

  const handleUpdate = (commentId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    fetch(`${API_URL}/bff/api/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: editedContent }),
    })
      .then(() => {
        console.log('✏️ 댓글 수정 완료:', commentId);
        setComments(prev =>
          prev.map(c => (c.id === commentId ? { ...c, content: editedContent } : c))
        );
        setEditingCommentId(null);
        setEditedContent('');
      })
      .catch(err => console.error('댓글 수정 실패:', err));
  };

  const handleDelete = (commentId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    fetch(`${API_URL}/bff/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        console.log('🗑️ 댓글 삭제 완료:', commentId);
        setComments(prev => prev.filter(c => c.id !== commentId));
      })
      .catch(err => console.error('댓글 삭제 실패:', err));
  };

  const handleArticleLike = () => {
    const token = localStorage.getItem('accessToken');
    if (!token || articleLiked) return;

    fetch(`${API_URL}/bff/api/recommend/news/${id}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        console.log('📰 뉴스 좋아요 등록 완료');
        setArticleLikes(prev => prev + 1);
        setArticleLiked(true);
      })
      .catch(err => console.error('뉴스 좋아요 실패:', err));
  };

  if (!news) return <div className="news-container">로딩 중...</div>;
  const userId = localStorage.getItem('userId');

  return (
    <div className="news-container">
      <div className="news-card">
        <div className="news-header">
  {/* ✅ 썸네일 + 뉴스사 이름을 감싸는 div 추가 */}
  <div className="news-thumbnail-wrapper">
    <img
      src={`${API_URL}/bff/api/image-proxy?url=${encodeURIComponent(news.thumbnailUrl)}`}
      alt="기사 이미지"
      className="news-image"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = '/default-thumbnail.png';
      }}
    />
    {news.provider && (
      <p className="news-provider">{news.provider}</p>
    )}
  </div>

  {/* 제목, 본문, 원문 링크 */}
  <div className="news-text">
    <h3 className="news-title">{news.title}</h3>
    <p className="news-content">{news.content}</p>
    {news.link && (
      <a
        href={news.link}
        className="news-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        기사 원문 보러가기 →
      </a>
    )}
  </div>
</div>

        <div className="news-like">
          <button className="like-button" onClick={handleArticleLike} disabled={articleLiked}>
            👍 좋아요 {articleLikes}
          </button>
        </div>

        <hr />

        <div className="comment-section">
          <textarea
            placeholder="댓글 작성"
            className="comment-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="comment-submit" onClick={handleWriteComment}>등록</button>

          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="comment-bottom">
                <div className="comment-text">
                  <div className="nickname">{comment.nickname || '익명'}</div>
                  {editingCommentId === comment.id ? (
                    <>
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                      <button onClick={() => handleUpdate(comment.id)}>수정 완료</button>
                      <button onClick={() => setEditingCommentId(null)}>취소</button>
                    </>
                  ) : (
                    <div className="comment">{comment.content}</div>
                  )}
                </div>
                <div className="comment-actions" ref={menuRef}>
                  <span
                    onClick={() => handleLike(comment.id, true)}
                    style={{ color: userActions[`${comment.id}_like`] ? 'blue' : 'black' }}
                  >
                    👍 {comment.likeCount ?? 0}
                  </span>
                  <span
                    onClick={() => handleLike(comment.id, false)}
                    style={{ color: userActions[`${comment.id}_dislike`] ? 'red' : 'black' }}
                  >
                    👎 {comment.dislikeCount ?? 0}
                  </span>
                  {userId == comment.userId && editingCommentId !== comment.id && (
                    <>
                      <span
                        className="menu"
                        onClick={() => setMenuOpenIndex(menuOpenIndex === comment.id ? null : comment.id)}
                      >
                        ⋮
                      </span>
                      {menuOpenIndex === comment.id && (
                        <div className="dropdown">
                          <div onClick={() => handleEdit(comment)}>수정</div>
                          <div onClick={() => handleDelete(comment.id)}>삭제</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
