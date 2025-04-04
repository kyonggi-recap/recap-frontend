import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { label: '세계', path: '/world' },
    { label: '국내', path: '/national' },
    { label: '경제/비즈니스', path: '/business' },
    { label: '기술', path: '/technology' },
    { label: '연예', path: '/entertainment' },
    { label: '스포츠', path: '/sports' },
    { label: '과학', path: '/science' },
    { label: '건강', path: '/health' },
  ];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {links.map((link, index) => (
          <li
            key={index}
            className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
          >
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
