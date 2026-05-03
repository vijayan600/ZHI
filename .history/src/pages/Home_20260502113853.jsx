import { useEffect, useRef } from 'react';
import UnicornScene from 'unicornstudio-react';
import styles from './Home.module.css';
import StatBadge    from '../components/StatBadge';
import ServiceCards from '../components/ServiceCards';

export default function Home() {
  const heroContentRef = useRef(null);

  useEffect(() => {
    const el = heroContentRef.current;
    if (!el) return;
    el.style.opacity   = '0';
    el.style.transform = 'translateY(30px)';
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>

      {/* ─── HERO ─── */}
      <main className={styles.home} id="home">

        {/* UnicornStudio background */}
        <div className={styles.splineWrap}>
          <UnicornScene
            projectId="vptFtFBhE3xURmEwlJHQ"
            width="100%"
            height="100%"
            scale={1}
            dpi={1.5}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.6/dist/unicornStudio.umd.js"
          />
        </div>

        <div className={styles.heroFade} />

        <div className={styles.heroContent} ref={heroContentRef}>
          <div className={styles.actions}>
            <a href="#services" className={styles.btnPrimary}>VIEW WORK</a>
            <a href="#about"    className={styles.btnGhost}>ABOUT ME</a>
          </div>
        </div>

        <StatBadge />
      </main>

      {/* ─── SERVICES ─── */}
      <ServiceCards />

      {/* ─── LAST SECTION ─── */}
      <div className={styles.lastSection}>
        <div className={styles.lastScene}>
          <UnicornScene
            projectId="nxRmN60IxP5wG9DViYFz"
            width="100%"
            height="100%"
            scale={1}
            dpi={1.5}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.11/dist/unicornStudio.umd.js"
          />
          {/* Centered glass CTA */}
          <div className={styles.lastCard}>
            <div className={styles.left}>
              <h3>Bring your idea to life</h3>
              <p>Hands-on design & editing — quick delivery, premium polish. Check our pricing or reach out for a custom quote.</p>
            </div>
            <div className={styles.right}>
              <a href="/pricing" className={styles.btnPrimary}>See Plans</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}