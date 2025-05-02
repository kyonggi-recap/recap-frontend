import React, { useState } from 'react';
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

const categories = [
  { name: '경제', icon: economyIcon },
  { name: '과학', icon: scienceIcon },
  { name: '스포츠', icon: sportsIcon },
  { name: '기술', icon: techIcon },
  { name: '자연', icon: natureIcon },
  { name: '연예', icon: cultureIcon },
  { name: '건강', icon: healthIcon },
  { name: '세계', icon: worldIcon },
];

export default function InterestSelector() {
  const [selected, setSelected] = useState([]);

  const toggleCategory = (name) => {
    const exists = selected.includes(name);
    if (exists) {
      setSelected(selected.filter((item) => item !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  const getOrder = (name) => {
    const index = selected.indexOf(name);
    return index >= 0 ? index + 1 : '';
  };

  return (
    <div className={styles.wrapper}>
      <img src={logoImg} alt="Re:cap 로고" className={styles.logo} />
      <h2 className={styles.title}>관심 카테고리 설정</h2>

      <div className={styles.list}>
        {categories.map((category) => (
          <div
            key={category.name}
            className={`${styles.item} ${selected.includes(category.name) ? styles.selected : ''}`}
            onClick={() => toggleCategory(category.name)}
          >
            <img src={category.icon} alt={`${category.name} 아이콘`} className={styles.icon} />
            <span>{category.name}</span>
            <div className={styles.order}>{getOrder(category.name)}</div>
          </div>
        ))}
      </div>

      <button className={styles.button}>선택 완료</button>
    </div>
  );
}
