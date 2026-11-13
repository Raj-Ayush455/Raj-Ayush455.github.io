import { useEffect, useState } from 'react';
import { profile, stats } from '../data';
import { scrollToId, useCountUp, useReveal } from '../hooks';
import { ArrowDown, GitHub, LinkedIn, Mail, Pin } from './Icons';
import Terminal from './Terminal';

function useTypewriter(words, { type = 70, erase = 35, hold = 1600 } = {}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      return;
    }
    const word = words[i % words.length];
    let t;
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), hold);
    else if (deleting && text === '') {
      setDeleting(false);
      setI((n) => n + 1);
    } else
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? erase : type,
      );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, type, erase, hold]);
  return text;
}

function Stat({ s, start }) {
  const v = useCountUp(s.value, start);
  return (
    <div className="border-l border-line pl-4">
      <p className="font-serif text-3xl text-ink sm:text-4xl">
        {s.prefix}
        {v.toFixed(s.decimals || 0)}
        {s.suffix}
      </p>
      <p className="mt-1 text-xs leading-snug text-muted">{s.label}</p>
    </div>
  );
}

export default function Hero({ onOpenPalette }) {
  const word = useTypewriter(profile.rotating);
  const statsRef = useReveal();
  const [statsIn, setStatsIn] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setStatsIn(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [statsRef]);

  return (
    <section id="home" className="relative scroll-mt-20 overflow-hidden">
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.status}
          </p>

          <h1 className="mt-7 font-serif text-5xl leading-[1.02] tracking-tight text-ink sm:text-7xl">
            {profile.name}
            <span className="block text-muted">
              builds <em className="text-accent">{word}</em>
              <span className="caret ml-0.5 h-[0.8em] translate-y-[0.08em]" aria-hidden />
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToId('projects')}
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              See my work <ArrowDown width={15} height={15} />
            </button>
            <button
              onClick={() => scrollToId('contact')}
              className="rounded-lg border border-line px-4 py-2.5 text-sm text-ink transition-colors hover:border-accent/60"
            >
              Get in touch
            </button>
            <div className="ml-1 flex items-center gap-1">
              {[
                [profile.links.github, GitHub, 'GitHub'],
                [profile.links.linkedin, LinkedIn, 'LinkedIn'],
                [`mailto:${profile.email}`, Mail, 'Email'],
              ].map(([href, Icon, label]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <p className="mt-6 flex items-center gap-1.5 text-xs text-faint">
            <Pin width={13} height={13} /> {profile.location}
            <span className="mx-2">·</span>
            press{' '}
            <button onClick={onOpenPalette} className="rounded border border-line px-1.5 font-mono text-[10px] text-muted hover:text-ink">
              Ctrl K
            </button>{' '}
            to jump anywhere
          </p>
        </div>

        <Terminal />
      </div>

      <div ref={statsRef} className="reveal relative mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} s={s} start={statsIn} />
          ))}
        </div>
      </div>
    </section>
  );
}
