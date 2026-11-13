import { useState } from 'react';
import { projectFilters, projects } from '../data';
import { spotlightHandlers } from '../hooks';
import { BucketDemo, PipelineDemo, StatesDemo } from './Demos';
import { Arrow, GitHub } from './Icons';
import { Reveal, Section, Tag } from './ui';

const DEMOS = { bucket: BucketDemo, pipeline: PipelineDemo, states: StatesDemo };

function ProjectCard({ p, highlight }) {
  const [more, setMore] = useState(false);
  const Demo = DEMOS[p.demo];
  return (
    <article {...spotlightHandlers()} className="spotlight grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[1.25fr_1fr]">
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-faint">{p.year}</p>
            <h3 className="mt-1.5 font-serif text-3xl text-ink">{p.title}</h3>
            <p className="mt-1 text-sm text-muted">{p.tagline}</p>
          </div>
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/60 hover:text-ink"
          >
            <GitHub width={14} height={14} /> Code
            <Arrow width={12} height={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          {p.metrics.map((m) => (
            <div key={m.l} className="rounded-lg bg-surface-2 px-3 py-3">
              <dt className="sr-only">{m.l}</dt>
              <dd className="font-serif text-2xl text-ink">{m.v}</dd>
              <p className="mt-0.5 text-[11px] leading-tight text-muted">{m.l}</p>
            </div>
          ))}
        </dl>

        <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-muted">
          {(more ? p.points : p.points.slice(0, 2)).map((pt) => (
            <li key={pt} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {pt}
            </li>
          ))}
        </ul>
        {p.points.length > 2 && (
          <button onClick={() => setMore((m) => !m)} className="mt-3 text-xs text-accent underline-offset-4 hover:underline">
            {more ? 'Show less' : `+ ${p.points.length - 2} more details`}
          </button>
        )}

        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <Tag key={s} active={highlight?.toLowerCase() === s.toLowerCase()}>
              {s}
            </Tag>
          ))}
        </div>
      </div>

      {Demo && (
        <div className="border-t border-line bg-bg/40 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <p className="mb-4 text-xs text-faint">
            <span className="text-accent">●</span> interactive · try it
          </p>
          <Demo />
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const shown = projects.filter((p) => filter === 'All' || p.categories.includes(filter));

  return (
    <Section id="projects" index="03" kicker="selected work" title="Things I've built">
      <Reveal className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {projectFilters.map((f) => {
          const count = f === 'All' ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                filter === f ? 'border-ink bg-ink text-bg' : 'border-line text-muted hover:border-faint hover:text-ink'
              }`}
            >
              {f} <span className="ml-1 opacity-60">{count}</span>
            </button>
          );
        })}
      </Reveal>
      <div className="space-y-6">
        {shown.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <a
          href="https://github.com/Raj-Ayush455?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          More on GitHub <Arrow width={14} height={14} />
        </a>
      </Reveal>
    </Section>
  );
}
