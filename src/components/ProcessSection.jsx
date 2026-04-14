import { useEffect, useRef } from 'react';
import styles from './ProcessSection.module.css';

const steps = [
  {
    number: '01',
    days: '1 DAY',
    title: 'Discovery Call',
    items: ['Understand your niche', 'Clarify your goals', 'Identify obstacles'],
    side: 'left',
  },
  {
    number: '02',
    days: '1 DAY',
    title: 'Design',
    items: ['Map the path to sales', 'Create seamless interface', 'Create a clean look'],
    side: 'right',
  },
  {
    number: '03',
    days: '7 DAYS',
    title: 'Build',
    items: ['Connect all your tools', 'Set up auto-tasks', 'Build your brand'],
    side: 'left',
  },
  {
    number: '04',
    days: '28 DAYS',
    title: 'Launch',
    items: ['Go live with ease', 'Track the results', 'Optimization'],
    side: 'right',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const dotRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const line = lineRef.current;
      if (!section || !line) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const vh = window.innerHeight;

      // Fill starts earlier — when section is 65% down the viewport
      const raw = (-rect.top + vh * 0.65) / (sectionHeight * 0.75);
      const progress = Math.max(0, Math.min(1, raw));

      line.style.height = `${progress * 100}%`;

      steps.forEach((_, i) => {
        // Cards trigger early: 0%, 11%, 22%, 33%
        const threshold = (i / steps.length) * 0.45;
        const dot = dotRefs.current[i];
        const card = cardRefs.current[i];
        if (!dot || !card) return;

        if (progress >= threshold) {
          dot.classList.add(styles.dotActive);
          card.classList.add(styles.cardVisible);
        } else {
          dot.classList.remove(styles.dotActive);
          card.classList.remove(styles.cardVisible);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    setTimeout(onScroll, 50);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <section ref={sectionRef} className={styles.section} id="process">
        <div className={styles.header}>
          <span className={styles.headerTag}>HOW IT WORKS</span>
          <h2 className={styles.headerTitle}>The Process</h2>
          <p className={styles.headerSub}>From idea to launch — here's how we make it happen.</p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.track}>
            <div ref={lineRef} className={styles.lineFill} />
          </div>

          {steps.map((step, i) => (
            <div key={step.number} className={styles.step}>
              <div ref={el => (dotRefs.current[i] = el)} className={styles.dot}>
                <div className={styles.dotInner} />
                <div className={styles.dotGlow} />
              </div>

              <div
                ref={el => (cardRefs.current[i] = el)}
                className={`${styles.card} ${step.side === 'right' ? styles.cardRight : styles.cardLeft}`}
              >
                <span className={styles.cardDays}>{step.days}</span>
                <h3 className={styles.cardTitle}>
                  <span className={styles.cardNum}>{step.number}.</span> {step.title}
                </h3>
                <ul className={styles.cardList}>
                  {step.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerText}>Ready to start?</span>
          <a href="#contact" className={styles.cta}>
            <span className={styles.ctaText}>Contact Us ↗</span>
          </a>

          {/* Glowing purple arch portal below button */}
          <div className={styles.portalWrapper} aria-hidden="true">
            <div className={styles.portalBloom} />
            <svg className={styles.portalSvg} viewBox="0 0 500 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer soft ring */}
              <path
                d="M 30 260 A 220 220 0 0 1 470 260"
                stroke="url(#outerGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#blur1)"
              />
              {/* Main bright ring */}
              <path
                d="M 55 260 A 195 195 0 0 1 445 260"
                stroke="url(#mainGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#blur2)"
              />
              {/* Inner pink core */}
              <path
                d="M 100 260 A 150 150 0 0 1 400 260"
                stroke="url(#innerGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#blur3)"
              />
              {/* Bright hotspot center */}
              <path
                d="M 160 260 A 90 90 0 0 1 340 260"
                stroke="url(#hotGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <defs>
                <linearGradient id="outerGrad" x1="30" y1="260" x2="470" y2="260" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3b0764" stopOpacity="0"/>
                  <stop offset="30%" stopColor="#6d28d9" stopOpacity="0.7"/>
                  <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.9"/>
                  <stop offset="70%" stopColor="#6d28d9" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#3b0764" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="mainGrad" x1="55" y1="260" x2="445" y2="260" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4c1d95" stopOpacity="0"/>
                  <stop offset="25%" stopColor="#7c3aed" stopOpacity="1"/>
                  <stop offset="50%" stopColor="#a78bfa" stopOpacity="1"/>
                  <stop offset="75%" stopColor="#7c3aed" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#4c1d95" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="innerGrad" x1="100" y1="260" x2="400" y2="260" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0"/>
                  <stop offset="35%" stopColor="#c084fc" stopOpacity="1"/>
                  <stop offset="50%" stopColor="#e879f9" stopOpacity="1"/>
                  <stop offset="65%" stopColor="#c084fc" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="hotGrad" x1="160" y1="260" x2="340" y2="260" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f0abfc" stopOpacity="0"/>
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#f0abfc" stopOpacity="0"/>
                </linearGradient>

                <filter id="blur1" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
                <filter id="blur2" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
                <filter id="blur3" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}