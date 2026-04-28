import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About({ t }) {
  return (
    <section id="about" className="section about-section">
      <div className="section-inner about-grid">
        <motion.div
          className="about-logo glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <img src="/assets/logo_big.png" alt="SloWeb Studio logo" />
          <span className="location-pill"><MapPin size={16} />{t.about.badge}</span>
        </motion.div>
        <motion.div
          className="about-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="eyebrow">Studio</span>
          <h2>{t.about.title}</h2>
          {t.about.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="highlight-grid">
            {t.about.highlights.map((item) => <span key={item}>{item}</span>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
