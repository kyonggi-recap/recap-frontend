import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NewsDetail.css';

export default function NewsDetail() {
  const { state } = useLocation();
  const initialNews = state?.article || {
    id: 1,
    title: "하드코딩된 뉴스 제목",
    summary: "이것은 요약입니다.",
    image: "https://via.placeholder.com/300",
    url: "https://example.com",
  };

  const [news] = useState(initialNews);
  const [comments, setComments] = useState([
    { id: 1, content: "좋은 기사네요", userId: "1", nickname: "사용자1", likes: 3, dislikes: 0 },
    { id: 2, content: "잘 읽었습니다", userId: "2", nickname: "사용자2", likes: 1, dislikes: 0 },
  ]);

  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const userId = "1"; // 하드코딩된 현재 사용자 ID

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    const newId = comments.length + 1;
    const newEntry = {
      id: newId,
      content: newComment,
      userId,
      nickname: "나",
      likes: 0,
      dislikes: 0,
    };
    setComments([...comments, newEntry]);
    setNewComment('');
  };

  const handleLike = (commentId, isLike = true) => {
    setComments(prev =>
      prev.map(c =>
        c.id === commentId
          ? {
              ...c,
              likes: isLike ? c.likes + 1 : c.likes,
              dislikes: !isLike ? c.dislikes + 1 : c.dislikes,
            }
          : c
      )
    );
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleUpdate = (commentId) => {
    setComments(prev =>
      prev.map(c => (c.id === commentId ? { ...c, content: editedContent } : c))
    );
    setEditingCommentId(null);
    setEditedContent('');
  };

  const handleDelete = (commentId) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  return (
    <div className="news-container">
      <div className="news-card">
        <div className="news-header">
          <img src={news.image} alt="기사 이미지" className="news-image" />
          <div className="news-text">
            <h3 className="news-title">{news.title}</h3>
            <p className="news-summary">{news.summary}</p>
            <a href={news.url} className="news-link" target="_blank" rel="noopener noreferrer">
              기사 원문 보러가기 →
            </a>
          </div>
        </div>

        <hr />

        <div className="comment-section">
          <textarea
            placeholder="댓글 작성"
            className="comment-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="comment-submit" onClick={handleSubmitComment}>
            등록
          </button>

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
                <div className="comment-actions">
                  <span onClick={() => handleLike(comment.id, true)}>👍 {comment.likes}</span>
                  <span onClick={() => handleLike(comment.id, false)}>👎 {comment.dislikes}</span>
                  {userId === comment.userId && editingCommentId !== comment.id && (
                    <>
                      <button onClick={() => handleEdit(comment)}>✏️ 수정</button>
                      <button onClick={() => handleDelete(comment.id)}>🗑 삭제</button>
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
