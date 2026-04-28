import { Code2, Globe2, LayoutDashboard, MonitorSmartphone, PenTool, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';

const icons = [LayoutDashboard, Settings2, PenTool, Code2, Globe2, MonitorSmartphone];

export default function Services({ t }) {
  return (
    <section id="services" className="section services-section">
      <div className="section-inner">
        <div className="section-heading">
          <span className="eyebrow">SloWeb Studio</span>
          <h2>{t.services.title}</h2>
          <p>{t.services.subtitle}</p>
        </div>
        <div className="services-grid">
          {t.services.items.map(([title, text], index) => {
            const Icon = icons[index];
            return (
              <motion.article
                className="glass-card service-card"
                key={title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div className="icon-box"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
