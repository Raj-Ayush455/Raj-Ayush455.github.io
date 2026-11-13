import { useCallback, useEffect, useMemo, useState } from 'react';
import About from './components/About';
import Achievements from './components/Achievements';
import CommandPalette from './components/CommandPalette';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import { profile, sections } from './data';
import { scrollToId, useScrollSpy, useTheme } from './hooks';

export default function App() {
  const ids = useMemo(() => sections.map((s) => s.id), []);
  const active = useScrollSpy(ids);
  const [theme, toggleTheme] = useTheme();
  const [palette, setPalette] = useState(false);
  const openPalette = useCallback(() => setPalette(true), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <Navbar active={active} theme={theme} onToggleTheme={toggleTheme} onOpenPalette={openPalette} />
      <main>
        <Hero onOpenPalette={openPalette} />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <footer className="border-t border-line/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-8 text-xs text-faint sm:flex-row sm:items-center sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React & Tailwind.
          </p>
          <button onClick={() => scrollToId('home')} className="hover:text-ink">
            Back to top ↑
          </button>
        </div>
      </footer>
      <CommandPalette open={palette} onClose={() => setPalette(false)} onToggleTheme={toggleTheme} />
    </>
  );
}
