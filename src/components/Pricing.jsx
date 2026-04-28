import { motion } from 'framer-motion';

export default function Pricing({ t }) {
  return (
    <section id="pricing" className="section pricing-section">
      <div className="section-inner">
        <div className="section-heading">
          <span className="eyebrow">Pricing</span>
          <h2>{t.pricing.title}</h2>
          <p>{t.pricing.subtitle}</p>
        </div>
        <div className="pricing-grid">
          {t.pricing.items.map(([title, price, text], index) => (
            <motion.article
              className="glass-card pricing-card"
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <h3>{title}</h3>
              <strong>{price}</strong>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
        <div className="center-row">
          <button className="btn btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>{t.pricing.cta}</button>
        </div>
      </div>
    </section>
  );
}
