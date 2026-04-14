import { Suspense, lazy, useEffect, useRef } from 'react';
import styles from './Home.module.css';

const Spline = lazy(() => import('@splinetool/react-spline'));

const SCENE_URL = 'https://prod.spline.design/Gl3UTXGdN9YWtdTG/scene.splinecode';

function SplineFallback() {
  return (
    <div className={styles.splineFallback}>
      <div className={styles.loader}>
        <span />
        <span />
        <span />
      </div>
      <p>Loading 3D Scene…</p>
    </div>
  );
}

export default function Home() {
  const heroTextRef = useRef(null);

  useEffect(() => {
    const el = heroTextRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className={styles.home} id="home">
      {/* ── 3-D canvas, full viewport ── */}
      <div className={styles.splineWrap}>
        <Suspense fallback={<SplineFallback />}>
          <Spline scene={SCENE_URL} className={styles.spline} />
        </Suspense>
        {/* subtle vignette so text stays readable */}
        <div className={styles.vignette} />
      </div>

      {/* ── Hero copy ── */}
      <div className={styles.heroContent} ref={heroTextRef}>
        <p className={styles.eyebrow}>Creative Developer &amp; Designer</p>
        <h1 className={styles.heading}>
          Crafting
          <br />
          <em>Digital</em>
          <br />
          Experiences
        </h1>
        <p className={styles.sub}>
          I build immersive, interactive interfaces that live at the
          intersection of design and technology.
        </p>
        <div className={styles.actions}>
          <a href="#work" className={styles.btnPrimary}>
            View Work
          </a>
          <a href="#about" className={styles.btnGhost}>
            About Me
          </a>
        </div>

        <div className={styles.featureOverlay} aria-hidden>
          <div className="title">Featured Experience</div>
          <div className="desc">Try the new Get-Started walkthrough — quick tour.</div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className={styles.scrollHint}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </div>

      {/* ── Floating stat chips ── */}
      <div className={styles.statsBar}>
        {[
          { value: '5+', label: 'Years Exp.' },
          { value: '40+', label: 'Projects' },
          { value: '20+', label: 'Happy Clients' },
        ].map((s) => (
          <div key={s.label} className={styles.chip}>
            <span className={styles.chipValue}>{s.value}</span>
            <span className={styles.chipLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
