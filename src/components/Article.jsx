import React from "react";
import "./Article.css";

function Article({ article, onClick }) {
  return (
    <div className="article-container" onClick={() => onClick(article)}>
      <h3 className="article-title">{article.title}</h3>
      <div className="article-meta">
        <span className="meta-item">댓글: {article.commentCount}</span>
        <span className="meta-item">좋아요: {article.likeCount}</span>
      </div>
    </div>
  );
}

export default Article;