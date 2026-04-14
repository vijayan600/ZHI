import { useState } from 'react';
import styles from './StatBadge.module.css';

const stats = [
  { value: '5+',  label: 'Projects' },
  { value: '3+',  label: 'Clients'  },
  { value: '6',   label: 'Services' },
];

export default function StatBadge() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${styles.badge} ${hovered ? styles.expanded : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Collapsed state */}
      <div className={`${styles.collapsed} ${hovered ? styles.hide : ''}`}>
        <span className={styles.collapsedValue}>5+</span>
        <span className={styles.collapsedLabel}>Projects</span>
      </div>

      {/* Expanded state — three cards */}
      <div className={`${styles.cards} ${hovered ? styles.show : ''}`}>
        {stats.map((s) => (
          <div key={s.label} className={styles.card}>
            <span className={styles.cardValue}>{s.value}</span>
            <span className={styles.cardLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}