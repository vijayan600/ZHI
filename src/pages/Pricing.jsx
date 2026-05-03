import { useState, useEffect, useRef } from 'react';
import styles from './Pricing.module.css';

const plans = [
  {
    number: '01', tag: 'Development', title: 'Website with App',
    price: 'Rs. 2999 To Rs. 5999', unit: 'starting at', color: '#00e5ff',
    features: ['Responsive Design', 'Modern UI / UX', 'Up to 5 Sections', 'Contact Form', 'Basic SEO Setup', '1 Revision Round'],
    cta: 'Get Started', popular: true,
  },
  {
    number: '02', tag: 'Motion', title: 'Video Editing',
    price: 'Rs. 999', priceTo: 'Rs. 2,499', unit: 'per project', color: '#ff2d55',
    features: ['Reels & Short-form', 'Color Grading', 'Motion Graphics', 'Background Music', 'Subtitles / Captions', '2 Revision Rounds'],
    cta: 'Book Now', 
  },
  {
    number: '03', tag: 'Design', title: 'Posters',
    price: 'Rs. 199', priceTo: 'Rs. 299', unit: 'per poster', color: '#f59e0b',
    features: ['Print-ready Files', 'Custom Typography', 'Brand Colors Applied', 'Hi-Res Export (300dpi)', 'PNG + PDF Delivery', '1 Revision Round'],
    cta: 'Order Now',
  },
  {
    number: '04', tag: 'Print', title: 'Birthday Invitations',
    price: 'Rs. 99', priceTo: 'Rs. 149', unit: 'per card', color: '#a855f7',
    features: ['Custom Theme Design', 'Photo Integration', 'Event Details Included', 'Print-ready Export', 'Digital Share Version', '1 Revision Round'],
    cta: 'Order Now',
  },
  {
    number: '05', tag: 'Print', title: 'Birthday Magazines',
    price: 'Rs. 999', unit: '10 pages', color: '#10b981',
    features: ['10 Custom Pages', 'Photo Collages', 'Personalized Story', 'Premium Layout Design', 'PDF + Print-ready', '2 Revision Rounds'],
    cta: 'Create Yours',
  },
  {
    number: '06', tag: 'Design', title: 'Custom Gift Cards',
    price: 'Rs. 249', priceTo: 'Rs. 299', unit: 'per card', color: '#ff6b6b',
    features: ['Custom Illustration', 'Personalized Message', 'Premium Finish Design', 'Digital Delivery', 'Print-ready Version', '1 Revision Round'],
    cta: 'Order Now',
  },
];

export default function Pricing() {
  const [hovered,  setHovered]  = useState(null);
  const [visible,  setVisible]  = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(prev => [...new Set([...prev, Number(e.target.dataset.idx)])]);
        }
      }),
      { threshold: 0.12 }
    );
    cardRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="pricing">
      {/* Ambient blobs */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.blobC} />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── Header ── */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>TRANSPARENT PRICING</span>
          <h2 className={styles.heading}>
            Choose Your{' '}
            <span className={styles.headingAccent}>Creative Plan</span>
          </h2>
          <p className={styles.sub}>
            Premium quality design &amp; development at honest prices.
            No hidden fees — just great work.
          </p>
        </header>

        {/* ── Cards grid ── */}
        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div
              key={plan.number}
              ref={el => (cardRefs.current[i] = el)}
              data-idx={i}
              className={[
                styles.card,
                hovered === i  ? styles.cardHovered  : '',
                visible.includes(i) ? styles.cardVisible : '',
                plan.popular   ? styles.cardPopular  : '',
              ].join(' ')}
              style={{ '--c': plan.color, '--delay': `${i * 90}ms` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {plan.popular && (
                <div className={styles.popularBadge} style={{ background: plan.color }}>
                  ✦ Most Popular
                </div>
              )}

              <div className={styles.glassInner}>
                {/* iPhone notch */}
                <div className={styles.notch}>
                  <div className={styles.notchPill} />
                </div>

                <div className={styles.cardTop}>
                  <span className={styles.num}>{plan.number}</span>
                  <span className={styles.tag} style={{ color: plan.color }}>{plan.tag}</span>
                </div>

                <h3 className={styles.cardTitle}>{plan.title}</h3>

                <div className={styles.priceBlock}>
                  <span className={styles.unit}>{plan.unit}</span>
                  <div className={styles.priceRow}>
                    <span className={styles.price} style={{ color: plan.color }}>{plan.price}</span>
                    {plan.priceTo && (
                      <>
                        <span className={styles.priceDash}>–</span>
                        <span className={styles.price} style={{ color: plan.color }}>{plan.priceTo}</span>
                      </>
                    )}
                  </div>
                </div>

                <div
                  className={styles.divider}
                  style={{ background: `linear-gradient(90deg,${plan.color}88,transparent)` }}
                />

                <ul className={styles.features}>
                  {plan.features.map(f => (
                    <li key={f} className={styles.feature}>
                      <span className={styles.featureDot} style={{ background: plan.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* ✅ Updated: href="/contact" instead of "#contact" */}
                <a
                  href="/contact"
                  className={styles.cta}
                  style={{
                    background:   hovered === i ? plan.color : `linear-gradient(135deg,${plan.color}22,${plan.color}11)`,
                    borderColor:  `${plan.color}55`,
                    color:        hovered === i ? '#000' : plan.color,
                  }}
                >
                  {plan.cta}
                  <span className={styles.ctaArrow}>→</span>
                </a>
              </div>

              <div className={styles.gloss} />
              <div
                className={styles.glowRing}
                style={{ boxShadow: `0 0 60px ${plan.color}22, inset 0 0 40px ${plan.color}08` }}
              />
            </div>
          ))}
        </div>

        <p className={styles.note}>
          All prices are in Indian Rupees (INR). Custom requirements?{' '}
          
          <a href="/contact" className={styles.noteLink}>Let's talk →</a>
        </p>
      </div>
    </section>
  );
}