import { useCategory } from "./CategoryContext";
import styles from './Navbar.module.css';

export default function Navbar() {
  const { selectedCategory, setSelectedCategory } = useCategory();

  // 간단한 문자열 배열로 구성
  const links = ["메인", "정치", "경제", "연예", "스포츠"];

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navlist}>
        {links.map((label, index) => (
          <li
            key={label + index}
            className={`${styles.navitem} ${selectedCategory === label ? styles.active : ''}`}
            onClick={() => setSelectedCategory(label)}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
