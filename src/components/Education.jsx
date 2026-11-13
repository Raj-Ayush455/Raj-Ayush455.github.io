import { education } from '../data';
import { Reveal, Section, Tag } from './ui';

function Ring({ value, max = 10 }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90" role="img" aria-label={`CGPA ${value} of ${max}`}>
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--line)" strokeWidth="6" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / max)}
      />
    </svg>
  );
}

export default function Education() {
  const e = education;
  return (
    <Section id="education" index="06" kicker="education" title="Where I study">
      <Reveal>
        <div className="grid overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-[1fr_auto]">
          <div className="p-6 sm:p-8">
            <p className="font-mono text-xs text-faint">{e.place}</p>
            <h3 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">{e.school}</h3>
            <p className="mt-2 text-ink">{e.degree}</p>
            <p className="text-sm text-muted">{e.spec}</p>

            <p className="mt-8 text-xs uppercase tracking-wider text-faint">Relevant coursework</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {e.coursework.map((c) => (
                <Tag key={c}>{c}</Tag>
              ))}
            </div>
            <p className="mt-6 text-xs uppercase tracking-wider text-faint">Also</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
              {e.extras.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-5 border-t border-line bg-bg/40 p-6 sm:p-8 md:flex-col md:justify-center md:border-l md:border-t-0">
            <div className="relative grid place-items-center">
              <Ring value={Number(e.cgpa)} />
              <span className="absolute font-serif text-3xl text-ink">{e.cgpa}</span>
            </div>
            <p className="text-sm text-muted md:text-center">
              CGPA
              <span className="block text-xs text-faint">out of 10</span>
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
