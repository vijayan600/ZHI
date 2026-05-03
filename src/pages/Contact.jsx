import { useState, useEffect, useRef } from 'react';
import styles from './Contact.module.css';

const SOCIALS = [
  { label: 'Instagram', handle: '@zhi_graphix',          color: '#ff2d55', icon: '◈' },
  { label: 'WhatsApp',  handle: '+91 9876543210',      color: '#10b981', icon: '◉' },
  { label: 'Email',     handle: 'zhigraphix@gmail.com', color: '#00e5ff', icon: '◇' },
];

const SERVICES = [
  'Website ','Website with App', 'Video Editing', 'Posters',
  'Birthday Invitations', 'Birthday Magazines', 'Custom Gift Cards', 'Other',
];

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', service: '', message: '' });
  const [focused, setFocused] = useState(null);
  const [sent,    setSent]    = useState(false);
  // ✅ Start visible immediately — page is standalone, no scroll needed
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Slight delay so the CSS transition plays nicely on page load
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    // 👉 Replace with your actual form submission / emailjs / formspree
    setSent(true);
  };

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.grain} aria-hidden="true" />

      <div className={`${styles.inner} ${visible ? styles.innerVisible : ''}`}>

        {/* Header */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>GET IN TOUCH</span>
          <h2 className={styles.heading}>
            Let's Create{' '}
            <span className={styles.headingAccent}>Something Great</span>
          </h2>
          <p className={styles.sub}>
            Have a project in mind? Drop a message and I'll get back within 24 hours.
          </p>
        </header>

        {/* Two-column layout */}
        <div className={styles.layout}>

          {/* ── Left: info ── */}
          <div className={styles.infoPanel}>
            <div className={styles.glassCard}>
              <div className={styles.notch}><div className={styles.notchPill} /></div>

              <p className={styles.cardLabel}>REACH ME DIRECTLY</p>
              <div className={styles.socials}>
                {SOCIALS.map(s => (
                  <div key={s.label} className={styles.socialRow}>
                    <span className={styles.socialIcon} style={{ color: s.color }}>{s.icon}</span>
                    <div>
                      <span className={styles.socialLabel}>{s.label}</span>
                      <span className={styles.socialHandle} style={{ color: s.color }}>{s.handle}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.infoDivider} />

              <p className={styles.cardLabel}>RESPONSE TIME</p>
              <div className={styles.responseRow}>
                <span className={styles.responseDot} />
                <span className={styles.responseText}>Usually within 24 hours</span>
              </div>

              <div className={styles.gloss} />
            </div>

            <div className={styles.availBadge}>
              <span className={styles.availDot} />
              Available for new projects
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className={styles.formWrap}>
            {sent ? (
              <div className={styles.glassCard} style={{ textAlign: 'center', padding: '60px 30px' }}>
                <div className={styles.notch}><div className={styles.notchPill} /></div>
                <div className={styles.successIcon}>✦</div>
                <h3 className={styles.successTitle}>Message Sent!</h3>
                <p className={styles.successSub}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  className={styles.successBtn}
                  onClick={() => { setSent(false); setForm({ name:'', email:'', service:'', message:'' }); }}
                >
                  Send Another
                </button>
                <div className={styles.gloss} />
              </div>
            ) : (
              <form className={styles.glassCard} onSubmit={handleSubmit}>
                <div className={styles.notch}><div className={styles.notchPill} /></div>

                <div className={styles.formGrid}>
                  {[
                    { name: 'name',  type: 'text',  label: 'Your Name',    placeholder: 'e.g. Vijay Kumar' },
                    { name: 'email', type: 'email', label: 'Email Address', placeholder: 'you@gmail.com' },
                  ].map(field => (
                    <div
                      key={field.name}
                      className={`${styles.fieldWrap} ${focused === field.name ? styles.fieldFocused : ''}`}
                    >
                      <label className={styles.label}>{field.label}</label>
                      <input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        value={form[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field.name)}
                        onBlur={() => setFocused(null)}
                        className={styles.input}
                      />
                      <div className={styles.fieldGlow} />
                    </div>
                  ))}
                </div>

                <div className={`${styles.fieldWrap} ${focused === 'service' ? styles.fieldFocused : ''}`}>
                  <label className={styles.label}>Service Interested In</label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    onFocus={() => setFocused('service')}
                    onBlur={() => setFocused(null)}
                    className={`${styles.input} ${styles.select}`}
                  >
                    <option value="" disabled>Select a service…</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className={styles.fieldGlow} />
                </div>

                <div className={`${styles.fieldWrap} ${focused === 'message' ? styles.fieldFocused : ''}`}>
                  <label className={styles.label}>Your Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project…"
                    required
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className={`${styles.input} ${styles.textarea}`}
                  />
                  <div className={styles.fieldGlow} />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <span>Send Message</span>
                  <span className={styles.submitArrow}>→</span>
                </button>

                <div className={styles.gloss} />
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}