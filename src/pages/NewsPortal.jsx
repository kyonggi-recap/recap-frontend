import React, { useState, useEffect } from "react";
import Article from "../components/Article";
import "./NewsPortal.css";

export default function NewsPortal() {
  const [selectedCategory, setSelectedCategory] = useState("메인");
  const [selectedRegion, setSelectedRegion] = useState("국내"); // 국내/해외 전환 상태
  const [popularArticles, setPopularArticles] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const allArticles = {
    국내: {
      메인: [
        { id: 1, title: "인기 기사 1", category: "popular", image: "https://via.placeholder.com/150" },
        { id: 2, title: "인기 기사 2", category: "popular", image: "https://via.placeholder.com/150" },
        { id: 17, title: "인기 기사 3", category: "popular", image: "https://via.placeholder.com/150" },
        { id: 3, title: "추천 기사 1", category: "recommended", image: "https://via.placeholder.com/150" },
        { id: 4, title: "추천 기사 2", category: "recommended", image: "https://via.placeholder.com/150" },
        { id: 18, title: "추천 기사 3", category: "recommended", image: "https://via.placeholder.com/150" },
      ],
      정치: [
        { id: 5, title: "국내 정치 기사 1", image: "https://via.placeholder.com/150" },
        { id: 6, title: "국내 정치 기사 2", image: "https://via.placeholder.com/150" },
      ],
      경제: [
        { id: 7, title: "국내 경제 기사 1", image: "https://via.placeholder.com/150" },
        { id: 8, title: "국내 경제 기사 2", image: "https://via.placeholder.com/150" },
      ],
    },
    해외: {
      메인: [
        { id: 9, title: "해외 인기 기사 1", category: "popular", image: "https://via.placeholder.com/150" },
        { id: 10, title: "해외 인기 기사 2", category: "popular", image: "https://via.placeholder.com/150" },
        { id: 11, title: "해외 추천 기사 1", category: "recommended", image: "https://via.placeholder.com/150" },
        { id: 12, title: "해외 추천 기사 2", category: "recommended", image: "https://via.placeholder.com/150" },
      ],
      정치: [
        { id: 13, title: "해외 정치 기사 1", image: "https://via.placeholder.com/150" },
        { id: 14, title: "해외 정치 기사 2", image: "https://via.placeholder.com/150" },
      ],
      경제: [
        { id: 15, title: "해외 경제 기사 1", image: "https://via.placeholder.com/150" },
        { id: 16, title: "해외 경제 기사 2", image: "https://via.placeholder.com/150" },
      ],
    }
  };

  useEffect(() => {
    if (selectedCategory === "메인") {
      setPopularArticles(allArticles[selectedRegion].메인.filter(article => article.category === "popular"));
      setRecommendedArticles(allArticles[selectedRegion].메인.filter(article => article.category === "recommended"));
      setArticles([]);
    } else {
      setArticles(allArticles[selectedRegion][selectedCategory] || []);
      setPopularArticles([]);
      setRecommendedArticles([]);
    }
  }, [selectedCategory, selectedRegion]);

  return (
    <div className="news-container">
      <nav className="news-nav">
        <div>
          {["메인", "정치", "경제","연애","스포츠"].map((tab) => (
            <button key={tab} onClick={() => setSelectedCategory(tab)} className="news-tab">
              {tab}
            </button>
          ))}
        </div>
        <div className="toggle-container">
          <button onClick={() => setSelectedRegion(selectedRegion === "국내" ? "해외" : "국내")} 
                  className={`toggle-button ${selectedRegion === "국내" ? "active" : ""}`}>
            <div className="toggle-circle"></div>
          </button>
        </div>
      </nav>
      
      {!selectedArticle ? (
        <div>
          {selectedCategory === "메인" ? (
            <>
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
            </>
          ) : (
            <div className="articles-container">
              {articles.map((article) => (
                <Article key={article.id} article={article} onClick={setSelectedArticle} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedArticle(null)} className="back-button">← 뒤로가기</button>
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
