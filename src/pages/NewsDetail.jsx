import './NewsDetail.css';
import { useEffect, useRef, useState } from 'react';

export default function NewsDetail() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  const [articleLikes, setArticleLikes] = useState(0);
  const [articleDislikes, setArticleDislikes] = useState(0);
  const [articleReaction, setArticleReaction] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = () => {
    if (comment.trim() === '') return;
    const newComment = {
      nickname: 'ㅇㅇ',
      content: comment,
      likes: 0,
      dislikes: 0,
      reaction: null,
      editing: false,
    };
    setComments([newComment, ...comments]);
    setComment('');
  };

  const handleCommentLike = (index) => {
    const updated = [...comments];
    const c = updated[index];
    if (c.reaction === 'like') {
      c.likes--;
      c.reaction = null;
    } else {
      if (c.reaction === 'dislike') c.dislikes--;
      c.likes++;
      c.reaction = 'like';
    }
    setComments(updated);
  };

  const handleCommentDislike = (index) => {
    const updated = [...comments];
    const c = updated[index];
    if (c.reaction === 'dislike') {
      c.dislikes--;
      c.reaction = null;
    } else {
      if (c.reaction === 'like') c.likes--;
      c.dislikes++;
      c.reaction = 'dislike';
    }
    setComments(updated);
  };

  const handleArticleLike = () => {
    if (articleReaction === 'like') {
      setArticleLikes(articleLikes - 1);
      setArticleReaction(null);
    } else {
      if (articleReaction === 'dislike') setArticleDislikes(articleDislikes - 1);
      setArticleLikes(articleLikes + 1);
      setArticleReaction('like');
    }
  };

  const handleArticleDislike = () => {
    if (articleReaction === 'dislike') {
      setArticleDislikes(articleDislikes - 1);
      setArticleReaction(null);
    } else {
      if (articleReaction === 'like') setArticleLikes(articleLikes - 1);
      setArticleDislikes(articleDislikes + 1);
      setArticleReaction('dislike');
    }
  };

  const toggleMenu = (index) => {
    setMenuOpenIndex(index === menuOpenIndex ? null : index);
  };

  const startEdit = (index) => {
    const updated = [...comments];
    updated[index].editing = true;
    setComments(updated);
    setMenuOpenIndex(null);
  };

  const handleEditChange = (index, value) => {
    const updated = [...comments];
    updated[index].content = value;
    setComments(updated);
  };

  const saveEdit = (index) => {
    const updated = [...comments];
    updated[index].editing = false;
    setComments(updated);
  };

  const deleteComment = (index) => {
    const updated = [...comments];
    updated.splice(index, 1);
    setComments(updated);
    setMenuOpenIndex(null);
  };

  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="detail-header">
          <img src="https://picsum.photos/200" alt="기사 이미지" className="detail-image" />
          <div className="detail-text">
            <h3 className="detail-title">백종원 신드롬 추락?</h3>
            <p className="detail-summary">
              올해 초부터 각종 논란에 휩싸인 백종원 대표가 사과문을 올렸다. ...
            </p>
            <a href="#" className="detail-link">기사 원문 보기 →</a>
          </div>
        </div>

        <div className="detail-reactions">
          <span className={`like ${articleReaction === 'like' ? 'active' : ''}`} onClick={handleArticleLike}>
            👍 <span>{articleLikes}</span>
          </span>
          <span className={`dislike ${articleReaction === 'dislike' ? 'active' : ''}`} onClick={handleArticleDislike}>
            👎 <span>{articleDislikes}</span>
          </span>
        </div>

        <hr />

        <div className="detail-comment-section">
          <textarea
            placeholder="댓글 작성"
            className="detail-comment-input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="detail-comment-actions">
            <button className="detail-comment-button" onClick={handleSubmit}>작성</button>
          </div>
          
          <div className="detail-comment-list">
            {comments.map((c, i) => (
              <div key={i} className="detail-comment-item">
                <div className="detail-comment-left">
                  <div className="nickname">{c.nickname}</div>
                  {c.editing ? (
                    <>
                      <textarea
                        className="detail-comment-edit"
                        value={c.content}
                        onChange={(e) => handleEditChange(i, e.target.value)}
                      />
                      <button className="detail-save-button" onClick={() => saveEdit(i)}>저장</button>
                    </>
                  ) : (
                    <div className="comment-text">{c.content}</div>
                  )}
                </div>
                <div className="detail-comment-right" ref={menuRef}>
                  <span className={`like ${c.reaction === 'like' ? 'active' : ''}`} onClick={() => handleCommentLike(i)}>
                    👍 <span>{c.likes}</span>
                  </span>
                  <span className={`dislike ${c.reaction === 'dislike' ? 'active' : ''}`} onClick={() => handleCommentDislike(i)}>
                    👎 <span>{c.dislikes}</span>
                  </span>
                  <span className="menu" onClick={() => toggleMenu(i)}>⋮</span>
                  {menuOpenIndex === i && (
                    <div className="dropdown">
                      <div onClick={() => startEdit(i)}>수정</div>
                      <div onClick={() => deleteComment(i)}>삭제</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}