import React from "react";
import "./Article.css";
import commentIcon from "../assets/comment.png"
import likeIcon from "../assets/good.png"


function Article({ article, onClick }) {
    const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

  // 원본 썸네일 URL이 있을 때 프록시 경로를 절대 URL로 구성
  const proxyUrl = article.thumbnailUrl
    ? `${baseURL}/bff/api/image-proxy?url=${encodeURIComponent(
        article.thumbnailUrl
      )}`
    : null;

  const scorePercent =
  typeof article.score === "number"
    ? `${Math.round(article.score)}%`
    : null;

  return (
    <div className="article-container" onClick={() => onClick(article)}>
      {proxyUrl && (
        <img
          className="article-thumbnail"
          src={proxyUrl}
          alt={article.title}
        />
      )}
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        <h2 className="article-con">{article.content}</h2>
        <div className="article-meta">
          <span className="meta-item">
            <img
              src={commentIcon}
              alt="댓글 아이콘"
              className="icon"
            />
            {article.commentCount}
          </span>
          <span className="meta-item">
            <img
              src={likeIcon}
              alt="좋아요 아이콘"
              className="icon"
            />
            {article.newsLikeCount}
          </span>
          {scorePercent && (
            <span className="meta-item score-item">{scorePercent}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Article;