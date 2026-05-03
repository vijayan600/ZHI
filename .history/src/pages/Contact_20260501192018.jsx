import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <main className={styles.section} id="contact">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Contact</span>
          <h2 className={styles.heading}>Get in touch</h2>
          <p className={styles.sub}>Drop a message and I will get back to you — typically within 24 hours.</p>
        </header>

        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <label className={styles.field}>
            <span>Name</span>
            <input type="text" name="name" required />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input type="email" name="email" required />
          </label>
          <label className={styles.field}>
            <span>Message</span>
            <textarea name="message" rows={6} required />
          </label>
          <button className={styles.cta} type="submit">Send</button>
          {sent && <p className={styles.thanks}>Thanks — message queued.</p>}
        </form>
      </div>
    </main>
  );
}
