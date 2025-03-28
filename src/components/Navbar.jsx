import './Navbar.css';

export default function Navbar() {
  const categories = ['메인', '정치', '경제', '스포츠', '연애'];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {categories.map((category, index) => (
          <li key={index} className={`nav-item ${index === 0 ? 'active' : ''}`}>
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}
