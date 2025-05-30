import React from "react";
import "./Article.css";

function Article({ article, onClick }) {
  return (
    <div className="article-container" onClick={() => onClick(article)}>
      <h3 className="article-title">{article.title}</h3>
    </div>
  );
}

export default Article;

