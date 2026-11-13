import { useState } from 'react';
import { stack } from '../data';
import { Reveal, Section } from './ui';

export default function TechStack() {
  const [sel, setSel] = useState(stack[0].items[0]);
  const [pinned, setPinned] = useState(false);
  const total = stack.reduce((n, g) => n + g.items.length, 0);

  const preview = (item) => !pinned && setSel(item);

  return (
    <Section id="stack" index="04" kicker="tech stack" title="Tools I reach for">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {stack.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 70}>
              <p className="mb-4 flex items-center justify-between border-b border-line pb-2 font-mono text-xs uppercase tracking-[0.2em] text-faint">
                {g.group}
                <span>{String(g.items.length).padStart(2, '0')}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => {
                  const on = sel?.name === it.name;
                  return (
                    <button
                      key={it.name}
                      onMouseEnter={() => preview(it)}
                      onFocus={() => preview(it)}
                      onClick={() => {
                        setSel(it);
                        setPinned((p) => !(p && on));
                      }}
                      className={`rounded-lg border px-3 py-1.5 text-sm transition-all duration-200 ${
                        on ? 'border-accent/70 bg-accent/10 text-ink' : 'border-line text-muted hover:-translate-y-0.5 hover:text-ink'
                      }`}
                    >
                      {it.name}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <aside className="rounded-xl border border-line bg-surface p-6 lg:sticky lg:top-24" aria-live="polite">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">{pinned ? 'pinned' : 'hover or tap a skill'}</p>
            <p className="mt-3 font-serif text-4xl text-ink">{sel?.name}</p>
            <p className="mt-5 text-xs uppercase tracking-wider text-faint">Used in</p>
            <ul className="mt-2 space-y-1.5">
              {sel?.used.map((u) => (
                <li key={u} className="flex items-center gap-2 text-sm text-ink">
                  <span className="h-px w-3 bg-accent" />
                  {u}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-4 text-xs text-muted">
              {total} tools across {stack.length} areas. Click a skill to pin it.
            </p>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
