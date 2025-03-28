import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchNews() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');

  return (
    <div>
      <h1>검색 결과</h1>
      <p>검색어: {keyword}</p>
      {/* 검색 결과를 표시하는 코드 추가할 곳 */}
    </div>
  );
}

export default SearchNews;