import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';

export default function HeroIntro({ t, onEnter, entered }) {
  const domain = 'yourwebsite.com';
  const [typed, setTyped] = useState('');

  useEffect(() => {
    setTyped('');
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTyped(domain.slice(0, index));
      if (index >= domain.length) clearInterval(interval);
    }, 78);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Enter') onEnter();
    };
    const onWheel = (event) => {
      if (window.scrollY < 10 && event.deltaY > 8) onEnter();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, [onEnter]);

  const letters = useMemo(() => Array.from({ length: 16 }), []);

  return (
    <section className={`intro-section ${entered ? 'intro-entered' : ''}`} aria-label="Intro">
      <div className="hero-copy">
        <img className="hero-logo" src="/assets/logo_big.png" alt="SloWeb Studio logo" />
        <h1>{t.intro.headline}</h1>
        <p>{t.intro.sub}</p>
      </div>

      <div className="monitor-stage">
        <div className="code-orbit" aria-hidden="true">
          {letters.map((_, index) => <span key={index} style={{ '--i': index }}>WEB</span>)}
        </div>
        <div className="monitor-3d">
          <div className="monitor-screen">
            <div className="browser-dots"><span /><span /><span /></div>
            <div className="search-bar">
              <Search size={18} />
              <span className="typed-text">{typed}<i /></span>
              <button onClick={onEnter} aria-label="Search and enter site"><ArrowRight size={18} /></button>
            </div>
            <div className="screen-grid">
              <span /><span /><span /><span /><span /><span />
            </div>
          </div>
          <div className="monitor-neck" />
          <div className="monitor-base" />
        </div>
      </div>

      <button className="enter-hint" onClick={onEnter}>
        <span>{t.intro.enter}</span>
        <ArrowRight size={18} />
      </button>
      <p className="interaction-hint">{t.intro.hint}</p>
    </section>
  );
}
