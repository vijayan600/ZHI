import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home',      href: '#home' },
  { label: 'Services',  href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing',   href: '#pricing' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      {/* ── Logo ── */}
      <a href="#home" className={styles.logo}>
        <span className={styles.logoTamil}>ழி</span>
        <div className={styles.logoTextWrap}>
          <span className={styles.logoName}>ZHI GRAPHIX</span>
          <span className={styles.logoTagline}>Design · Edit · Create</span>
        </div>
      </a>

      {/* ── Nav links ── */}
      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={styles.link}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* ── CTA ── */}
      <a href="#contact" className={styles.cta}>
        Let's Talk
      </a>

      {/* ── Burger ── */}
      <button
        className={styles.burger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen : ''}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen : ''}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen : ''}`} />
      </button>
    </nav>
  );
}