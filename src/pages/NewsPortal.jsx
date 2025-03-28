import React, { useState, useEffect } from "react";
import Article from "../components/Article";
import "./NewsPortal.css";

export default function NewsPortal() {
  const [popularArticles, setPopularArticles] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    setPopularArticles([
      { id: 1, title: "인기 기사 1", image: "https://via.placeholder.com/150" },
      { id: 2, title: "인기 기사 2", image: "https://via.placeholder.com/150" },
    ]);
    setRecommendedArticles([
      { id: 3, title: "추천 기사 1", image: "https://via.placeholder.com/150" },
      { id: 4, title: "추천 기사 2", image: "https://via.placeholder.com/150" },
    ]);
  }, []);



  return (
    <div className="news-container">
      <nav className="news-nav">
        {["메인", "정치", "경제", "스포츠", "연애"].map((tab) => (
          <button key={tab} className="news-tab">
            {tab}
          </button>
        ))}
      </nav>
      
      {!selectedArticle ? (
        <div>
            <h2 className="news-section-title">지금 가장 인기 있는</h2>
            <div className="articles-container">
            {popularArticles.map((article) => (
              <Article key={article.id} article={article} onClick={setSelectedArticle} />
            ))}
          </div>
          <h2 className="news-section-title">추천 기사</h2>
          <div className="articles-container">
            {recommendedArticles.map((article) => (
              <Article key={article.id} article={article} onClick={setSelectedArticle} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedArticle(null)} className="back-button">
            ← 뒤로가기
          </button>
          <h2 className="news-title">{selectedArticle.title}</h2>
          <img src={selectedArticle.image} alt={selectedArticle.title} className="news-image" />
          <p className="news-link">기사 원문 보러가기 →</p>
          <div className="comment-section">
            <textarea className="comment-input" placeholder="댓글 작성"></textarea>
            <button className="submit-button">등록</button>
          </div>
        </div>
      )}
    </div>
  );
}

