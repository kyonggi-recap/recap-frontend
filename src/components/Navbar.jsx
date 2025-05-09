import { useCategory } from "./CategoryContext";
import styles from './Navbar.module.css';
import { useNavigate, useLocation } from "react-router-dom";


export default function Navbar() {
  const categoryContext = useCategory();
  const selectedCategory = categoryContext?.selectedCategory;
  const setSelectedCategory = categoryContext?.setSelectedCategory;

  const navigate = useNavigate();
  const location = useLocation();

  // 간단한 문자열 배열로 구성
  const links = ["메인", "국내", "세계", "기술", "과학", "건강", "경제", "연예", "스포츠"];

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navlist}>
        {links.map((label) => (
          <li
            key={label}
            className={`${styles.navitem} ${selectedCategory === label ? styles.active : ""}`}
            onClick={() => {
              if (setSelectedCategory) {
                setSelectedCategory(label);
                if (location.pathname !== "/") {
                  navigate("/");
                }
              }
            }}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
