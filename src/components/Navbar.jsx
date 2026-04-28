import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { languages } from '../data/translations.js';

const links = [
  ['services', 'services'],
  ['work', 'work'],
  ['pricing', 'pricing'],
  ['about', 'about'],
  ['contact', 'contact'],
];

export default function Navbar({ lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="SloWeb Studio home">
        <img src="/assets/favicon.png" alt="SloWeb Studio" />
        <span>SloWeb Studio</span>
      </button>

      <nav className="nav-links" aria-label="Primary navigation">
        {links.map(([key, id]) => (
          <button key={id} onClick={() => scrollTo(id)}>{t.nav[key]}</button>
        ))}
      </nav>

      <div className="nav-actions">
        <LanguageButtons lang={lang} setLang={setLang} />
        <button className="btn btn-primary" onClick={() => scrollTo('contact')}>{t.nav.cta}</button>
      </div>

      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Open menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {links.map(([key, id]) => (
          <button key={id} onClick={() => scrollTo(id)}>{t.nav[key]}</button>
        ))}
        <LanguageButtons lang={lang} setLang={setLang} />
        <button className="btn btn-primary full" onClick={() => scrollTo('contact')}>{t.nav.cta}</button>
      </div>
    </header>
  );
}

function LanguageButtons({ lang, setLang }) {
  return (
    <div className="language-switcher" aria-label="Language switcher">
      {languages.map((item) => (
        <button
          key={item.code}
          className={lang === item.code ? 'active' : ''}
          onClick={() => setLang(item.code)}
          title={item.label}
          aria-label={item.label}
        >
          <img src={item.flag} alt="" />
        </button>
      ))}
    </div>
  );
}
