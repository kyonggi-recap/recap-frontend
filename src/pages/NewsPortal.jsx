import api from "../api/axios";
import React, { useState, useEffect } from "react";
import Article from "../components/Article";
import styles from "./NewsPortal.module.css";
import { useCategory } from "../components/CategoryContext";
import {useRegion} from "../components/RegionContext";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

export default function NewsPortal() {
  const {selectedCategory} = useCategory();
  const {selectedRegion} = useRegion();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fullArticles, setFullArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [page, setPage] = useState(1);

  const topicMap = {
    정치: "NATIONAL",
    경제: "BUSINESS",
    연예: "ENTERTAINMENT",
    스포츠: "SPORTS",
  };
  // 지역→country 매핑
  const countryMap = { 국내: "KR", 해외: "US" };

  const handleArticleClick = (article) => {
    navigate(`/news/${article.id}`, { state: { article } });
  };

  // 메인 카테고리: 인기 & 추천 기사 3개씩 fetch
  useEffect(() => {
    if (selectedCategory !== "메인") return;
    const fetchHome = async () => {
      setLoading(true);
      setError(null);
      try {
        const country = countryMap[selectedRegion];
        const res = await api.get("/bff/api/news/home", { params: { country } });
        const homeData = res.data || {};
        const hot = homeData.hotNewsList || [];
        const rec = homeData.recommendationNewsList || [];
        setPopularArticles(hot.slice(0, 3));
        setRecommendedArticles(rec.slice(0, 3));
      } catch (err) {
        console.error("메인 기사 로드 실패:", err);
        setError("메인 기사를 불러오는 중 오류가 발생했습니다.");
        setPopularArticles([]);
        setRecommendedArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
    // reset scroll state
    setFullArticles([]);
    setPage(1);
  }, [selectedCategory, selectedRegion]);

  useEffect(() => {
    if(selectedCategory === "메인") return;
    const fetchAllArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const topic = topicMap[selectedCategory];
        const country = countryMap[selectedRegion];
        const res = await api.get(
          `/bff/api/news/topics/${topic}`,
          { params: { country } }
        );
        const list = res.data.topicNewsList || [];
        setFullArticles(list);
        setPage(1);
      } catch (err) {
        console.error("기사 로드 실패:", err);
        setError("기사를 불러오는 중 오류가 발생했습니다.");
        setFullArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllArticles();
  }, [selectedCategory, selectedRegion]);

  // 무한 스크롤
    useEffect(() => {
    if (selectedCategory === "메인") return;
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loading &&
        page * PAGE_SIZE < fullArticles.length
      ) setPage((p) => p + 1);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [fullArticles.length, loading, page, selectedCategory]);

  const displayArticles =
    selectedCategory === "메인"
      ? []
      : fullArticles.slice(0, page * PAGE_SIZE);

 return (
  <div className={styles.container}>
    {selectedCategory === "메인" ? (
      loading ? (
        <p>로딩 중…</p>
      ) : (
        <>
          <h2 className={styles.sectionTitle}>지금 가장 인기 있는</h2>
          <div className={styles.articles}>
            {popularArticles.map((a) => (
              <Article
                key={a.id}
                article={a}
                onClick={() => handleArticleClick(a)}
              />
            ))}
          </div>

          <h2 className={styles.sectionTitle}>추천 기사</h2>
          <div className={styles.articles}>
            {recommendedArticles.map((a) => (
              <Article
                key={a.id}
                article={a}
                onClick={() => handleArticleClick(a)}
              />
            ))}
          </div>
        </>
      )
    ) : (
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className={styles.articles}>
          {displayArticles.map((a) => (
            <Article
              key={a.id}
              article={a}
              onClick={() => handleArticleClick(a)}
            />
          ))}
        </div>
        {loading && <p>로딩 중…</p>}
        {!loading && displayArticles.length === 0 && (
          <p>표시할 기사가 없습니다</p>
        )}
        {!loading && displayArticles.length >= fullArticles.length && (
          <p>더 이상 기사가 없습니다</p>
        )}
      </div>
    )}
  </div>
);
}