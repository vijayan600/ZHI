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

      const raw = (-rect.top + vh * 0.65) / (sectionHeight * 0.75);
      const progress = Math.max(0, Math.min(1, raw));

      line.style.height = `${progress * 100}%`;

      steps.forEach((_, i) => {
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
    <section ref={sectionRef} className={styles.section} id="process">
      <div className={styles.header}>
        <span className={styles.headerTag}>HOW IT WORKS</span>
        <h2 className={styles.headerTitle}>The Process</h2>
        <p className={styles.headerSub}>From idea to launch — here's how we make it happen.</p>
      </div>

      <div className={styles.timeline}>
        {/* Track */}
        <div className={styles.track}>
          <div ref={lineRef} className={styles.lineFill} />
        </div>

        {steps.map((step, i) => (
          <div key={step.number} className={styles.stepWrapper}>

            {/* Dot lives directly in .timeline so left is measured from .timeline edge */}
            <div
              ref={el => (dotRefs.current[i] = el)}
              className={styles.dot}
              aria-hidden="true"
            >
              <div className={styles.dotInner} />
              <div className={styles.dotGlow} />
            </div>

            {/* Step row — card positioned inside here */}
            <div className={styles.step}>
              <div
                ref={el => (cardRefs.current[i] = el)}
                className={`${styles.card} ${
                  step.side === 'right' ? styles.cardRight : styles.cardLeft
                }`}
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

          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.footerText}>Ready to start?</span>
        <a href="/contact" className={styles.cta}>
          <span className={styles.ctaText}>Contact Us ↗</span>
        </a>
      </div>
    </section>
  );
}