import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';
import '../pages/home.css';

const Logo = ({ className = '', size = 'md' }) => (
  <img
    src={logoImg}
    alt="Let me Smile"
    className={`home-logo__img home-logo__img--${size} ${className}`.trim()}
  />
);

const NAV_ITEMS = [
  { label: 'Home', to: '/', exact: true },
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Stories', to: '/', hash: '#stories' },
  { label: 'Donate', to: '/donation', hash: '#donate-form', cta: true },
];

function isNavActive(location, item) {
  const { pathname, hash } = location;

  if (item.hash) {
    return pathname === item.to && hash === item.hash;
  }

  if (item.exact) {
    return pathname === '/' && !hash;
  }

  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

function NavLink({ item, onNavigate }) {
  const location = useLocation();
  const active = isNavActive(location, item);
  const href = `${item.to}${item.hash || ''}`;

  return (
    <Link
      to={href}
      className={`home-nav__link${item.cta ? ' home-nav__cta' : ''}${
        active ? ' home-nav__link--active' : ''
      }`}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
    >
      {item.label}
    </Link>
  );
}

function SiteHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const isHome = location.pathname === '/' && !location.hash;

  return (
    <header className="home-header">
      <div className="home-header__inner">
        <Link
          to="/"
          className={`home-logo${isHome ? ' home-logo--active' : ''}`}
          onClick={closeMenu}
          aria-current={isHome ? 'page' : undefined}
        >
          <Logo size="md" />
          <span className="home-logo__text">
            Let me <span>Smile</span>
          </span>
        </Link>

        <button
          type="button"
          className="home-menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <nav className={`home-nav ${menuOpen ? 'home-nav--open' : ''}`} aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} item={item} onNavigate={closeMenu} />
          ))}
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
