// src/pages/NewsDetail.jsx
import './NewsDetail.css';

export default function NewsDetail() {
  return (
    <div className="news-container">
      <div className="news-card">
        <div className="news-header">
          <img
            src="https://picsum.photos/200"
            alt="기사 이미지"
            className="news-image"
          />
          <div className="news-text">
            <h3 className="news-title">
              백종원 신드롬 추락? 6일 만에 또 고객 숙였다…들끓는 여론
            </h3>
            <p className="news-summary">
              올해 초부터 각종 논란에 휩싸인 더본코리아 백종원 대표가 19일 사과문을 올렸다.
              지난 13일에 이어 두 번째 사과다. 백 대표를 둘러싼 각종 논란 등으로 인해...
            </p>
            <a href="#" className="news-link">기사 원문 보러가기 →</a>
          </div>
        </div>

        <hr />

        <div className="comment-section">
          <textarea placeholder="댓글 작성" className="comment-input" />

          <div className="comment-bottom">
            <div className="comment-text">
              <div className="nickname">닉네임1</div>
              <div className="comment">댓글 내용</div>
            </div>
            <div className="comment-actions">
              <span>👍</span>
              <span>👎</span>
            </div>
          </div>

          <hr />
        </div>
      </div>
    </div>
  );
}
