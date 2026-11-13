import { useState } from 'react';
import { about, profile } from '../data';
import { Reveal, Section } from './ui';

const PHOTOS = [
  { src: '/img/ayush.webp', alt: `Portrait of ${profile.name}`, caption: 'hi, that’s me' },
  { src: '/img/ayush-stage.webp', alt: `${profile.name} at an event`, caption: 'on stage, off duty' },
];

function PhotoStack() {
  const [front, setFront] = useState(0);
  const order = [front, 1 - front];
  return (
    <div className="mx-auto w-full max-w-[320px]">
      <button
        onClick={() => setFront((f) => 1 - f)}
        className="group relative block aspect-[4/5] w-full"
        aria-label="Show the other photo"
      >
        {order
          .slice()
          .reverse()
          .map((i) => {
            const isFront = i === front;
            return (
              <img
                key={PHOTOS[i].src}
                src={PHOTOS[i].src}
                alt={PHOTOS[i].alt}
                width="800"
                height="1000"
                loading="lazy"
                className={`absolute inset-0 h-full w-full rounded-2xl border border-line object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out ${
                  isFront
                    ? 'z-10 -rotate-2 saturate-[0.8] group-hover:rotate-0 group-hover:saturate-100'
                    : 'z-0 translate-x-5 translate-y-2 rotate-[5deg] opacity-70 saturate-50 brightness-75 group-hover:translate-x-8 group-hover:rotate-[8deg]'
                }`}
              />
            );
          })}
      </button>
      <p className="mt-6 flex items-center justify-between font-mono text-[11px] text-faint">
        <span>{PHOTOS[front].caption}</span>
        <span>click to shuffle ↻</span>
      </p>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" index="01" kicker="about" title="Between models and systems">
      <div className="grid gap-14 lg:grid-cols-[320px_1fr] lg:gap-20">
        <Reveal>
          <PhotoStack />
        </Reveal>
        <div>
          <Reveal className="space-y-5 text-[15px] leading-relaxed text-muted sm:text-base">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="pt-4">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">Right now</p>
              <ul className="space-y-2">
                {about.now.map((n) => (
                  <li key={n} className="flex gap-3 text-ink">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <dl className="grid overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2" style={{ gap: 1 }}>
              {about.facts.map((f) => (
                <div key={f.k} className="bg-surface px-5 py-4">
                  <dt className="text-xs uppercase tracking-wider text-faint">{f.k}</dt>
                  <dd className="mt-1 text-sm text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
