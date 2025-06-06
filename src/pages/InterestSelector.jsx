import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InterestSelector.module.css';
import logoImg from '../assets/Logo.png';
import economyIcon from '../assets/economy.png';
import scienceIcon from '../assets/science.png';
import sportsIcon from '../assets/sports.png';
import techIcon from '../assets/tech.png';
import natureIcon from '../assets/nature.png';
import cultureIcon from '../assets/culture.png';
import healthIcon from '../assets/health.png';
import worldIcon from '../assets/world.png';

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

const categories = [
  { name: '경제', key: 'BUSINESS', icon: economyIcon },
  { name: '과학', key: 'SCIENCE', icon: scienceIcon },
  { name: '스포츠', key: 'SPORTS', icon: sportsIcon },
  { name: '기술', key: 'TECHNOLOGY', icon: techIcon },
  { name: '자연', key: 'NATIONAL', icon: natureIcon },
  { name: '연예', key: 'ENTERTAINMENT', icon: cultureIcon },
  { name: '건강', key: 'HEALTH', icon: healthIcon },
  { name: '세계', key: 'WORLD', icon: worldIcon },
];

export default function InterestSelector() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // ✅ 최초 진입 시 관심사 불러오기
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('❗토큰 없음. 관심사 불러오기 생략');
      return;
    }

    fetch(`${API_URL}/bff/api/users/interests`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('📩 관심사 조회 응답 상태:', res.status);
        if (!res.ok) throw new Error('관심사 불러오기 실패');
        return res.json();
      })
      .then((data) => {
        console.log('📦 받아온 관심사:', data);
        setSelected(data.interests || []);
      })
      .catch((err) => {
        console.error('관심사 조회 오류:', err);
      });
  }, []);

  const toggleCategory = (key) => {
    const exists = selected.includes(key);
    if (exists) {
      setSelected(selected.filter((item) => item !== key));
    } else {
      setSelected([...selected, key]);
    }
  };

  const getOrder = (key) => {
    const index = selected.indexOf(key);
    return index >= 0 ? index + 1 : '';
  };

  const handleSubmit = () => {
    console.log('✅ handleSubmit 호출됨');
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다. 다시 로그인 해주세요.');
      return;
    }

   const payload = {
    interests: selected
  };
  console.log('📦 실제 전송될 payload:', JSON.stringify(payload, null, 2)); 

    fetch(`${API_URL}/bff/api/users/interests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log('응답 상태:', res.status);
        if (!res.ok) throw new Error('서버 응답 오류');
        return res.json();
      })
      .then((data) => {
        console.log('전송 성공:', data);
        alert('관심사 등록 완료!');
        navigate('/mypage');
      })
      .catch((err) => {
        console.error('전송 실패:', err);
        alert('전송 실패');
      });
  };

  return (
    <div className={styles.wrapper}>
      <img src={logoImg} alt="Re:cap 로고" className={styles.logo} />
      <h2 className={styles.title}>관심 카테고리 설정</h2>

      <div className={styles.list}>
        {categories.map((category) => (
          <div
            key={category.key}
            className={`${styles.item} ${selected.includes(category.key) ? styles.selected : ''}`}
            onClick={() => toggleCategory(category.key)}
          >
            <img src={category.icon} alt={`${category.name} 아이콘`} className={styles.icon} />
            <span>{category.name}</span>
            <div className={styles.order}>{getOrder(category.key)}</div>
          </div>
        ))}
      </div>

      <button type="button" className={styles.button} onClick={handleSubmit}>
        선택완료
      </button>
    </div>
  );
}
