import styles from './Pricing.module.css';

export default function Pricing() {
  return (
    <main className={styles.section} id="pricing">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Pricing</span>
          <h2 className={styles.heading}>Simple plans</h2>
          <p className={styles.sub}>Choose a plan that fits your needs — clear, predictable pricing.</p>
        </header>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Basic</h3>
            <p className={styles.price}>Starting at Rs.1000</p>
          </div>
          <div className={styles.card}>
            <h3>Standard</h3>
            <p className={styles.price}>Rs.2000 — Rs.3500</p>
          </div>
          <div className={styles.card}>
            <h3>Pro</h3>
            <p className={styles.price}>Custom quote</p>
          </div>
        </div>
      </div>
    </main>
  );
}
