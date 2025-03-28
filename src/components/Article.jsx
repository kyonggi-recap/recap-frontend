import React from "react";
import "./Article.css";

function Article({ article, onClick }) {
  return (
    <div className="article-container" onClick={() => onClick(article)}>
      <img src={article.image} alt={article.title} className="article-image" />
      <div>
        <h3 className="article-title">{article.title}</h3>
      </div>
    </div>
  );
}

export default Article;

