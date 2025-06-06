import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './SearchNews.module.css';

function SearchNews() {
  const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('keyword');
  const country = searchParams.get('type');

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query && country) {
      const fetchNews = async () => {
        try {
          setLoading(true);
          const page = 0;
          const size = 10;

          const url = `http://${API_URL}/bff/api/news/search?query=${encodeURIComponent(query)}&country=${country}&page=${page}&size=${size}`;
          const response = await fetch(url, {
            headers: { 'accept': 'application/json' }
          });
          const data = await response.json();
          setNewsList(data.articles || []);
        } catch (error) {
          console.error('뉴스 검색 실패:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchNews();
    }
  }, [query, country]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>검색 결과</h2>
      <div className={styles.info}>
        <span className={styles.keyword}>
          “<span className={styles.highlight}>{query}</span>”
        </span>{' '}
        검색 결과
      </div>

      {loading ? (
        <p className={styles.loading}>로딩 중...</p>
      ) : newsList.length > 0 ? (
        <ul className={styles.newsList}>
          {newsList.map((news, index) => (
            <li key={index} className={styles.newsCard}>
              <div className={styles.thumbnail}>
                <img src={news.thumbnail || '/default-thumbnail.png'} alt="썸네일" />
              </div>
              <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <p className={styles.newsSummary}>{news.summary}</p>
                <div className={styles.newsMeta}>
                  <span>{news.publisher}</span>
                  <span>🕒 {news.date || '날짜 미제공'}</span>
                  <span>👍 {news.likeCount || 0}</span>
                </div>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.readMore}
                >
                  자세히 보기
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResults}>
          <p>
            📭 <span className={styles.highlight}>“{query}”</span>에 대한 검색 결과가 존재하지 않습니다.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchNews;