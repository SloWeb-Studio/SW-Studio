import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroIntro from './components/HeroIntro.jsx';
import MainReveal from './components/MainReveal.jsx';
import Services from './components/Services.jsx';
import PortfolioCarousel from './components/PortfolioCarousel.jsx';
import Pricing from './components/Pricing.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import { translations } from './data/translations.js';

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('sloweb-lang') || 'en');
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    localStorage.setItem('sloweb-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => translations[lang] || translations.en, [lang]);

  const enterSite = () => {
    if (entered) return;
    setEntered(true);
    setTimeout(() => {
      document.getElementById('services-start')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1050);
  };

  return (
    <div className={`app-shell ${entered ? 'entered' : ''}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <HeroIntro t={t} onEnter={enterSite} entered={entered} />
      <main className="site-content">
        <MainReveal t={t} />
        <Services t={t} />
        <PortfolioCarousel t={t} lang={lang} />
        <Pricing t={t} />
        <About t={t} />
        <Contact t={t} />
      </main>
    </div>
  );
}
