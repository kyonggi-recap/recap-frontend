import api from "../api/axios";
import React, { useState, useEffect } from "react";
import Article from "../components/Article";
import styles from "./NewsPortal.module.css";
import { useCategory } from "../components/CategoryContext";
import {useRegion} from "../components/RegionContext";
import { useNavigate } from "react-router-dom";

export default function NewsPortal() {
  const {selectedCategory} = useCategory();
  const {selectedRegion} = useRegion();
  const navigate = useNavigate();

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
    },
    해외: {
      메인: [
        { id: 9, title: "해외 인기 기사 1", category: "popular", image: "https://via.placeholder.com/150" },
        { id: 10, title: "해외 인기 기사 2", category: "popular", image: "https://via.placeholder.com/150" },
        { id: 11, title: "해외 추천 기사 1", category: "recommended", image: "https://via.placeholder.com/150" },
        { id: 12, title: "해외 추천 기사 2", category: "recommended", image: "https://via.placeholder.com/150" },
      ],
    }
  };

  const [popularArticles, setPopularArticles] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const topicMap = {
    정치: "NATIONAL",
    경제: "BUSINESS",
    연예: "ENTERTAINMENT",
    스포츠: "SPORTS",
  };
  // 지역→country 매핑
  const countryMap = { 국내: "KR", 해외: "US" };

  // 쿠키에서 토큰 꺼내는 헬퍼
  const getAccessToken = () =>
    document.cookie.replace(/(?:^|; )accessToken=([^;]*);?/, "$1");

  const handleArticleClick = (article) => {
    navigate(`/news/${article.id}`, { state: { article } });
  };


  // “메인” 일 때는 기존 하드코딩 데이터 사용
  useEffect(() => {
    if (selectedCategory === "메인") {
      const mains = allArticles[selectedRegion].메인;
      setPopularArticles(mains.filter((a) => a.category === "popular"));
      setRecommendedArticles(mains.filter((a) => a.category === "recommended"));
      setArticles([]);
    }

    // 카테고리 or 지역 바뀌면 페이지 초기화
    setPage(1);
    setHasMore(true);
  }, [selectedCategory, selectedRegion]);

  // “메인”이 아닐 때, page가 바뀔 때마다 API 호출
  useEffect(() => {
    if (selectedCategory === "메인" || !hasMore) return;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const limit = page * 10; // API에 page 파라미터가 없으니 limit 늘려서 앞에서부터 가져옴
        const res = await api.get("http://15.164.211.206:8080/api/news/topic", {
        params: {
          topic: topicMap[selectedCategory],      
          country: countryMap[selectedRegion],    
          limit,
        },
      });
        const list = res.data.newsList ?? [];

        // 새로운 리스트로 교체
        setArticles(list);
        // 가져온 개수가 우리가 요청한 limit보다 작으면 더 이상 없음
        setHasMore(list.length >= limit);
      } catch (err) {
        console.error("기사 로드 실패:", err);
      }
      setLoading(false);
    };

    fetchArticles();
  }, [page, selectedCategory, selectedRegion]);

  // 무한 스크롤: 하단 근처에서 page++
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        selectedCategory !== "메인" &&
        hasMore &&
        !loading
      ) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [selectedCategory, hasMore, loading]);

  return (
    <div className={styles.container}>
        <>
          {selectedCategory === "메인" ? (
            <>
              <h2 className={styles.sectionTitle}>지금 가장 인기 있는</h2>
              <div className={styles.articles}>
                {popularArticles.map((a) => (
                  <Article
                    key={a.id}
                    article={a}
                    onClick={handleArticleClick(a)}
               />
                ))}
              </div>

              <h2 className={styles.sectionTitle}>추천 기사</h2>
              <div className={styles.articles}>
                {recommendedArticles.map((a) => (
                  <Article key={a.id} article={a} onClick={handleArticleClick(a)} />
                ))}
              </div>
            </>
          ) : (
            <div className={styles.articles}>
              {articles.map((a) => (
                <Article key={a.link || a.id} article={a} onClick={handleArticleClick(a)} />
              ))}
              {loading && <p>로딩 중…</p>}
              {!hasMore && <p>더 이상 기사가 없습니다</p>}
            </div>
          )}
        </>
    </div>
  );
}