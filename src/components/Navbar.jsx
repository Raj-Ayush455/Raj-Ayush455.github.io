import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { profile, sections } from '../data';
import { scrollToId, useScrollProgress } from '../hooks';
import { Close, Menu, Moon, Search, Sun } from './Icons';

export default function Navbar({ active, theme, onToggleTheme, onOpenPalette }) {
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const linkRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Slide the pill under the active link.
  useLayoutEffect(() => {
    const place = () => {
      const el = linkRefs.current[active];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'border-b border-line/80 bg-bg/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6" aria-label="Sections">
        <button onClick={() => go('home')} className="group flex items-center gap-2.5" aria-label="Back to top">
          <img
            src="/img/ayush.webp"
            alt=""
            width="32"
            height="32"
            className="h-8 w-8 rounded-lg border border-line object-cover object-[50%_25%] transition-colors group-hover:border-accent/50"
          />
          <span className="hidden text-sm font-medium text-ink sm:inline">{profile.name}</span>
        </button>

        <div className="relative hidden items-center lg:flex">
          <span
            className="absolute inset-y-0 rounded-full bg-surface-2 transition-all duration-300 ease-out"
            style={{ left: indicator.left, width: indicator.width, opacity: indicator.ready ? 1 : 0 }}
            aria-hidden
          />
          {sections.slice(1).map((s) => (
            <button
              key={s.id}
              ref={(el) => (linkRefs.current[s.id] = el)}
              onClick={() => go(s.id)}
              aria-current={active === s.id ? 'true' : undefined}
              className={`relative rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                active === s.id ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-ink sm:flex"
            aria-label="Open command menu"
          >
            <Search width={14} height={14} />
            <kbd className="font-mono text-[10px] text-faint">Ctrl K</kbd>
          </button>
          <button
            onClick={onToggleTheme}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun width={16} height={16} /> : <Moon width={16} height={16} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <Close width={16} height={16} /> : <Menu width={16} height={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line/70 lg:hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-4 py-3 sm:px-6">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  active === s.id ? 'bg-surface-2 text-ink' : 'text-muted hover:bg-surface'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-px">
        <div className="h-px origin-left bg-accent/70" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
}
