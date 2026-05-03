import { useEffect, useRef } from 'react';
import './styles/global.css';
import './styles/responsive.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    const dot = dotRef.current;
    dot.style.display = 'block';

    const move = (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const addHover = () => dot.classList.add('cursor-hovered');
    const removeHover = () => dot.classList.remove('cursor-hovered');

    window.addEventListener('mousemove', move);

    const t = setTimeout(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    }, 300);

    return () => {
      clearTimeout(t);
      window.removeEventListener('mousemove', move);
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" style={{ display: 'none' }} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}