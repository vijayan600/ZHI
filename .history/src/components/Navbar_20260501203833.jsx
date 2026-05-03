import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

// Home-page scroll sections
const scrollLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
];

// Separate route pages
const routeLinks = [
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  // Only observe scroll sections when on home page
  useEffect(() => {
    if (!isHomePage) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      }),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    scrollLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHomePage]);

  // Set active based on current route
  useEffect(() => {
    if (location.pathname === '/pricing') setActive('pricing');
    else if (location.pathname === '/contact') setActive('contact');
    else if (location.pathname === '/') setActive('home');
  }, [location.pathname]);

  const handleScrollClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHomePage) {
      scrollToSection(id);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(id), 300);
    }
  };

  const handleRouteClick = () => setMenuOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>

      {/* Logo */}
      <a href="/" className={styles.logo} onClick={e => { e.preventDefault(); navigate('/'); }}>
        <span className={styles.logoTamil}>ழி</span>
        <div className={styles.logoTextWrap}>
          <span className={styles.logoName}>ZHI GRAPHIX</span>
          <span className={styles.logoTagline}>Design · Edit · Create</span>
        </div>
      </a>

      {/* Nav links */}
      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {scrollLinks.map(({ label, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`${styles.link} ${active === id ? styles.linkActive : ''}`}
              onClick={e => handleScrollClick(e, id)}
            >
              {label}
            </a>
          </li>
        ))}

        {routeLinks.map(({ label, path }) => (
          <li key={path}>
            <Link
              to={path}
              className={`${styles.link} ${location.pathname === path ? styles.linkActive : ''}`}
              onClick={handleRouteClick}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link to="/contact" className={styles.cta} onClick={handleRouteClick}>
        Let's Talk
      </Link>

      {/* Burger */}
      <button
        className={styles.burger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen : ''}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen : ''}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen : ''}`} />
      </button>
    </nav>
  );
}
