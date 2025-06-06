// src/pages/SearchNews.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";                      // axios 인스턴스 (baseURL 세팅)
import { useRegion } from "../components/RegionContext";
import Article from "../components/Article";          // 재사용 가능한 카드 컴포넌트
import styles from "./SearchNews.module.css";

export default function SearchNews() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedRegion } = useRegion(); // "국내" 또는 "해외"
  
  // URL 쿼리에서 keyword를 꺼냅니다. (ex: /search?keyword=apple)
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("keyword") || "";

  // RegionContext의 selectedRegion 을 BFF API가 요구하는 형식으로 바꿔줍니다.
  const country = selectedRegion === "국내" ? "KR" : "US";

  const [newsList, setNewsList] = useState([]); // NewsBffDto[] 형태로 저장
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1페이지(0) / 페이지당 10개
  const PAGE     = 0;
  const PAGESIZE = 10;

  useEffect(() => {
    // keyword가 비어 있으면 API를 호출하지 않고 빈 리스트로 둡니다.
    if (!query.trim()) {
      setNewsList([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        // BFF Search API: /bff/api/news/search?query={}&country={}&page={}&size={}
        const res = await api.get("/bff/api/news/search", {
          params: {
            query: query,
            country: country,
            page: PAGE,
            size: PAGESIZE,
          },
        });

        // 응답 스키마: { contents: NewsBffDto[], page: PageBffDto }
        // 필요한 건 contents(뉴스 배열) 뿐이므로,
        // 성공 케이스에서는 contents 배열을 state에 넣습니다.
        const responseData = res.data || {};
        const contents = responseData.contents || [];
        setNewsList(contents);
      } catch (err) {
        console.error("뉴스 검색 실패:", err);
        setError("검색 중 오류가 발생했습니다.");
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, country]);

  // 검색 결과 중 아무것도 없고, 로딩도 끝났을 때 “검색어를 입력하세요”가 아니라
  // “결과가 없습니다” 메시지를 띄우기 위해서 아래와 같이 분기합니다.

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>검색 결과</h2>

      {/* 검색 키워드 표시 */}
      <div className={styles.info}>
        {query ? (
          <>
            “<span className={styles.highlight}>{query}</span>” 검색 결과
          </>
        ) : (
          <>검색어를 입력하세요.</>
        )}
      </div>

      {loading ? (
        <p className={styles.loading}>로딩 중…</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : newsList.length > 0 ? (
        <div className={styles.articles}>
          {newsList.map((newsItem) => (
            <Article
              key={newsItem.id}
              article={newsItem}
              onClick={() =>
                // 클릭 시 뉴스 상세 페이지로 이동
                navigate(`/news/${newsItem.id}`, { state: { article: newsItem } })
              }
            />
          ))}
        </div>
      ) : (
        // keyword가 비어 있거나, 검색 결과가 0개인 경우
        <div className={styles.noResults}>
          {query ? (
            <p>
              📭 <span className={styles.highlight}>“{query}”</span>에 대한 검색 결과가
              없습니다.
            </p>
          ) : (
            <p>검색어를 입력하고 Enter 키를 눌러주세요.</p>
          )}
        </div>
      )}
    </div>
  );
}
