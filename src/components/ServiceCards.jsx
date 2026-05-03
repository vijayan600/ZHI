import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ServiceCards.module.css';
import ProcessSection from './ProcessSection';

const services = [
  { number: '01', title: 'Websites with App',           desc: 'Rs.2999 to Rs.5999', tag: 'Development', video: '/videos/01-web.mp4',       color: '#00e5ff' },
  { number: '02', title: 'Video Editing',        desc: 'Rs.999 to Rs.2499',  tag: 'Motion',      video: '/videos/02-video.mp4',      color: '#ff2d55' },
  { number: '03', title: 'Posters',              desc: 'Rs.199 to Rs.299',    tag: 'Design',      video: '/videos/03-poster.mp4',     color: '#f59e0b' },
  { number: '04', title: 'Birthday Invitations', desc: 'Rs.99 to Rs.149',    tag: 'Print',       video: '/videos/04-invitation.mp4', color: '#a855f7' },
  { number: '05', title: 'Birthday Magazines',   desc: '10 pages – Rs.999',  tag: 'Print',       video: '/videos/05-magazine.mp4',   color: '#10b981' },
  { number: '06', title: 'Custom Gift Cards',    desc: 'Rs.249 to Rs.299',    tag: 'Design',      video: '/videos/06-giftcard.mp4',   color: '#ff6b6b' },
];

const N = services.length;

const GLITCH_TIMING = [
  { dur: '3.8s', delay: '0.0s'  },
  { dur: '5.3s', delay: '1.4s'  },
  { dur: '4.1s', delay: '2.9s'  },
  { dur: '6.7s', delay: '0.7s'  },
  { dur: '3.3s', delay: '3.6s'  },
  { dur: '5.9s', delay: '2.1s'  },
];

const VH_PER_CARD = 120;
const TOTAL_VH    = N * VH_PER_CARD;

function lerp(a, b, t) { return a + (b - a) * t; }

function getRadius() {
  const w = window.innerWidth;
  if (w <= 380) return 240;
  if (w <= 480) return 260;
  if (w <= 600) return 300;
  if (w <= 900) return 380;
  return 480;
}

function getCircularStyle(index, floatIndex) {
  const radius = getRadius();
  const w = window.innerWidth;
  // Wider fan on mobile so cards don't touch
  const spread = w <= 900 ? Math.PI * 1.5 : Math.PI * 1.2;
  const step   = spread / (N - 1);
  const angle  = (index - floatIndex) * step;
  const x      = Math.sin(angle) * radius;
  const z      = Math.cos(angle) * radius;
  return {
    x,
    z,
    scale:   0.6 + (z / radius) * 0.4,
    opacity: 0.3 + (z / radius) * 0.7,
    rotateY: angle * -40,
  };
}

const PARTICLE_DATA = Array.from({ length: 20 }, (_, i) => ({
  id:    i,
  left:  `${(i * 4.5 + Math.sin(i) * 8  + 50) % 100}%`,
  top:   `${(i * 7.3 + Math.cos(i) * 12 + 30) % 100}%`,
  delay: `${(i * 0.73) % 9}s`,
  dur:   `${6 + (i % 4)}s`,
  size:  `${2 + (i % 3)}px`,
  color: ['#00e5ff','#ff2d55','#a855f7','#f59e0b','#10b981','rgba(255,255,255,0.45)'][i % 6],
}));

export default function ServiceCards() {
  const rootRef   = useRef(null);
  const cardRefs  = useRef([]);
  const videoRefs = useRef([]);
  const rafRef    = useRef(null);
  const smoothRef = useRef(0);
  const targetRef = useRef(0);

  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onScroll = () => {
      const rootTopPx = root.getBoundingClientRect().top + window.scrollY;
      const relPx     = window.scrollY - rootTopPx;
      const relVh     = (relPx / window.innerHeight) * 100;
      targetRef.current = Math.max(0, Math.min(relVh, TOTAL_VH));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      smoothRef.current = lerp(smoothRef.current, targetRef.current, 0.09);
      const f = Math.max(0, Math.min(smoothRef.current / VH_PER_CARD, N - 1));
      const newActive = Math.min(Math.round(f), N - 1);
      setActive(prev => (prev !== newActive ? newActive : prev));

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const p     = getCircularStyle(i, f);
        const color = services[i].color;

        const hideThreshold = getRadius() * -0.4;
        if (p.z < hideThreshold) { el.style.opacity = '0'; return; }

        el.style.opacity   = String(p.opacity);
        el.style.transform =
          `translateX(${p.x}px) translateZ(${p.z}px) rotateY(${p.rotateY}deg) scale(${p.scale})`;
        el.style.filter    = `blur(${Math.max(0, (1 - p.scale) * 5).toFixed(2)}px)`;
        el.style.zIndex    = String(Math.round(100 + p.z));

        const glowThreshold = getRadius() * 0.58;
        if (p.z > glowThreshold) {
          el.style.boxShadow   = `0 0 50px ${color}44, 0 0 110px ${color}18`;
          el.style.borderColor = `${color}55`;
        } else {
          el.style.boxShadow   = 'none';
          el.style.borderColor = 'rgba(255,255,255,0.05)';
        }

        const infoEl = el.querySelector(`.${styles.info}`);
        if (infoEl) infoEl.style.opacity = '1';
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach(v => { if (v) v.play().catch(() => {}); });
  }, []);

  const goTo = useCallback(i => {
    const root = rootRef.current;
    if (!root) return;
    const idx       = Math.max(0, Math.min(i, N - 1));
    const rootTopPx = root.getBoundingClientRect().top + window.scrollY;
    const targetVh  = idx * VH_PER_CARD;
    window.scrollTo({ top: rootTopPx + (targetVh / 100) * window.innerHeight, behavior: 'smooth' });
  }, []);

  const s = services[active];

  return (
    <>
      <div
        ref={rootRef}
        className={styles.root}
        id="services"
        style={{ height: `${TOTAL_VH}vh` }}
      >
        <div className={styles.stage}>

          <div className={styles.blob} style={{ '--blob': s.color }} />

          <div className={styles.particles} aria-hidden="true">
            {PARTICLE_DATA.map(p => (
              <span key={p.id} className={styles.dot} style={{
                left: p.left, top: p.top, width: p.size, height: p.size,
                background: p.color, animationDuration: p.dur, animationDelay: p.delay,
              }} />
            ))}
          </div>

          <div className={styles.leftPanel}>
            <span className={styles.lpNumber}>{s.number}</span>
            <span className={styles.lpTag} style={{ color: s.color }}>{s.tag}</span>
            <h2 className={styles.lpTitle}>{s.title}</h2>
            <p className={styles.lpPrice}>{s.desc}</p>
            <span className={styles.lpDivider} style={{ background: s.color }} />
            <ul className={styles.lpNav}>
              {services.map((svc, i) => (
                <li
                  key={svc.number}
                  className={`${styles.lpNavItem} ${i === active ? styles.lpNavActive : ''}`}
                  style={{ '--c': svc.color }}
                  onClick={() => goTo(i)}
                >
                  <span className={styles.lpNavLine} />
                  <span className={styles.lpNavName}>{svc.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.counter}>
            <button className={styles.btn} onClick={() => goTo(active - 1)} aria-label="Previous">‹</button>
            <div className={styles.counterInner}>
              <span className={styles.counterCurrent} style={{ color: s.color }}>
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className={styles.counterSlash}>/</span>
              <span className={styles.counterTotal}>{String(N).padStart(2, '0')}</span>
            </div>
            <button className={styles.btn} onClick={() => goTo(active + 1)} aria-label="Next">›</button>
          </div>

          <div className={styles.track}>
            {services.map((svc, i) => {
              const gt = GLITCH_TIMING[i];
              return (
                <div
                  key={svc.number}
                  ref={el => (cardRefs.current[i] = el)}
                  className={`${styles.card} ${i === active ? styles.cardActive : ''}`}
                  style={{ '--gDur': gt.dur, '--gDelay': gt.delay }}
                  onClick={() => goTo(i)}
                >
                  <div className={styles.gloss} />
                  <video
                    ref={el => (videoRefs.current[i] = el)}
                    className={styles.video}
                    src={svc.video}
                    muted loop playsInline
                  />
                  <div className={`${styles.glitchLayer} ${styles.glitchR}`} />
                  <div className={`${styles.glitchLayer} ${styles.glitchB}`} />
                  <div className={styles.scanlines} aria-hidden="true" />
                  <div className={styles.grad} />
                  <div className={styles.info}>
                    <span
                      className={styles.tag}
                      style={{ borderColor: `${svc.color}55`, color: svc.color }}
                    >
                      {svc.tag}
                    </span>
                    <h3 className={styles.title}>{svc.title}</h3>
                    <p className={styles.price}>{svc.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Mobile dot navigation (replaces left panel on ≤600px) ── */}
          <div className={styles.mobileNav} aria-label="Service navigation">
            {services.map((svc, i) => (
              <span
                key={svc.number}
                className={`${styles.mobileDot} ${i === active ? styles.mobileDotActive : ''}`}
                style={{ background: i === active ? svc.color : undefined }}
                onClick={() => goTo(i)}
                role="button"
                aria-label={svc.title}
              />
            ))}
          </div>

          <p className={styles.hint}>scroll to explore</p>
        </div>
      </div>

      <ProcessSection />
    </>
  );
}