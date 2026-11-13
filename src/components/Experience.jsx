import { useState } from 'react';
import { experience } from '../data';
import { Plus } from './Icons';
import { Reveal, Section, Tag } from './ui';

export default function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="experience" index="02" kicker="work experience" title="Where I've worked">
      <ol className="relative space-y-4 border-l border-line pl-6 sm:pl-10">
        {experience.map((e, i) => {
          const isOpen = open === i;
          return (
            <Reveal as="li" key={e.company} delay={i * 80} className="relative">
              <span
                className={`absolute top-6 -left-[29px] h-2.5 w-2.5 rounded-full border-2 transition-colors sm:-left-[45px] ${
                  isOpen ? 'border-accent bg-accent' : 'border-line bg-bg'
                }`}
                aria-hidden
              />
              <div className={`rounded-xl border bg-surface transition-colors ${isOpen ? 'border-accent/40' : 'border-line hover:border-faint/60'}`}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                  aria-expanded={isOpen}
                >
                  <div>
                    <p className="font-mono text-xs text-faint">{e.period}</p>
                    <h3 className="mt-1.5 text-lg font-medium text-ink">
                      {e.role} <span className="text-muted">· {e.company}</span>
                    </h3>
                    <p className="mt-1 text-sm text-muted">{e.summary}</p>
                  </div>
                  <span
                    className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300 ${
                      isOpen ? 'rotate-45 text-accent' : ''
                    }`}
                  >
                    <Plus width={14} height={14} />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-400 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 sm:px-6">
                      <ul className="space-y-3 text-sm leading-relaxed text-muted">
                        {e.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {e.stack.map((s) => (
                          <Tag key={s}>{s}</Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
