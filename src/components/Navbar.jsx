import { useCategory } from "./CategoryContext";
import { useRegion } from "./RegionContext";
import styles from './Navbar.module.css';
import { useNavigate, useLocation } from "react-router-dom";


export default function Navbar() {
  const categoryContext = useCategory();
  const selectedCategory = categoryContext?.selectedCategory;
  const setSelectedCategory = categoryContext?.setSelectedCategory;

  const regionContext = useRegion();
  const selectedRegion = regionContext?.selectedRegion;
  const setSelectedRegion = regionContext?.setSelectedRegion;

  const navigate = useNavigate();
  const location = useLocation();

  // 간단한 문자열 배열로 구성
  const links = ["메인", "세계", "기술", "과학", "건강", "경제", "연예", "스포츠"];

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
        <li className={styles.toggleContainer}>
          <button onClick={() => setSelectedRegion(selectedRegion === "국내" ? "해외" : "국내")} 
                  className={`${styles.toggleButton} ${selectedRegion === "국내" ? styles.toggleButtonActive : ""}`}>
            <div className={styles.toggleCircle}></div>
          </button>
        </li>
      </ul>
    </nav>
  );
}
