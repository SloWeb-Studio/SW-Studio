import { motion } from 'framer-motion';

export default function MainReveal({ t }) {
  return (
    <section id="services-start" className="section reveal-section">
      <div className="section-inner reveal-grid">
        <motion.div
          className="reveal-copy"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">{t.reveal.badge}</span>
          <h2>{t.reveal.title}</h2>
          <p>{t.reveal.text}</p>
          <div className="button-row">
            <button className="btn btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>{t.reveal.cta}</button>
            <button className="btn btn-ghost" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>{t.reveal.secondary}</button>
          </div>
        </motion.div>

        <motion.div
          className="floating-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t.reveal.chips.map((chip, index) => (
            <div className={`skill-chip chip-${index + 1}`} key={chip}>{chip}</div>
          ))}
          <div className="mini-window">
            <div className="mini-top"><span /><span /><span /></div>
            <div className="mini-line wide" />
            <div className="mini-line" />
            <div className="mini-cards"><span /><span /><span /></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
