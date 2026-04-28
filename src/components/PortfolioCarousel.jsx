import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolio.js';

const descriptions = {
  en: [
    'A modern nightlife website with events, galleries, and club information.',
    'A clean presentation website for a local café and social space.',
    'A modern tech service website with clear service structure and strong visual identity.',
    'A multilingual camp website with packages, trainers, information, and booking flow.',
    'A custom client website built with a focused layout and clear presentation.',
    'A presentation website for a niche business with clear product and brand information.'
  ],
  sl: [
    'Moderna spletna stran za nočni klub z dogodki, galerijami in informacijami o klubu.',
    'Čista predstavitvena spletna stran za lokalni caffe in družabni prostor.',
    'Moderna spletna stran za tehnološke storitve z jasno strukturo in močno vizualno identiteto.',
    'Večjezična spletna stran za kamp z paketi, trenerji, informacijami in prijavnim tokom.',
    'Prilagojena spletna stran z osredotočeno postavitvijo in jasno predstavitvijo.',
    'Predstavitvena spletna stran za nišno dejavnost z jasno predstavitvijo izdelkov in znamke.'
  ],
  de: [
    'Eine moderne Website für Nachtleben mit Events, Galerien und Clubinformationen.',
    'Eine klare Präsentationswebsite für ein lokales Café und einen sozialen Treffpunkt.',
    'Eine moderne Website für technische Dienstleistungen mit klarer Struktur und starker visueller Identität.',
    'Eine mehrsprachige Camp-Website mit Paketen, Trainern, Informationen und Buchungsablauf.',
    'Eine individuelle Website mit fokussiertem Layout und klarer Präsentation.',
    'Eine Präsentationswebsite für ein Nischenunternehmen mit klaren Produkt- und Markeninformationen.'
  ]
};

export default function PortfolioCarousel({ t, lang }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const desc = descriptions[lang] || descriptions.en;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % projects.length), 3000);
    return () => clearInterval(timer);
  }, [paused]);

  const project = projects[active];
  const prev = () => setActive((active - 1 + projects.length) % projects.length);
  const next = () => setActive((active + 1) % projects.length);

  const sideProjects = useMemo(() => ({
    prev: projects[(active - 1 + projects.length) % projects.length],
    next: projects[(active + 1) % projects.length]
  }), [active]);

  return (
    <section id="work" className="section portfolio-section">
      <div className="section-inner">
        <div className="section-heading">
          <span className="eyebrow">Portfolio</span>
          <h2>{t.portfolio.title}</h2>
          <p>{t.portfolio.subtitle}</p>
        </div>

        <div className="portfolio-layout" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <button className="carousel-btn left" onClick={prev} aria-label="Previous project"><ChevronLeft /></button>
          <div className="side-preview side-left"><span>{sideProjects.prev.name}</span></div>

          <div className="tablet-frame">
            <div className="tablet-camera" />
            <AnimatePresence mode="wait">
              <motion.div
                className="tablet-screen"
                key={project.url}
                initial={{ opacity: 0, scale: 0.96, rotateY: 8 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.97, rotateY: -8 }}
                transition={{ duration: 0.45 }}
              >
                <iframe title={project.name} src={project.url} loading="lazy" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="side-preview side-right"><span>{sideProjects.next.name}</span></div>
          <button className="carousel-btn right" onClick={next} aria-label="Next project"><ChevronRight /></button>
        </div>

        <div className="portfolio-info glass-card">
          <div>
            <span className="status-dot">{t.portfolio.live}</span>
            <h3>{project.name}</h3>
            <p>{desc[active]}</p>
            <small>{t.portfolio.fallback}</small>
          </div>
          <a className="btn btn-primary" href={project.url} target="_blank" rel="noreferrer">
            {t.portfolio.visit}<ExternalLink size={16} />
          </a>
        </div>

        <div className="dots" aria-label="Project navigation">
          {projects.map((item, index) => (
            <button key={item.name} className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={item.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
