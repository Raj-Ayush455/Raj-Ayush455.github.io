import { useReveal } from '../hooks';

export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

export function Section({ id, index, title, kicker, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
              <span className="text-accent">{index}</span> / {kicker}
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-none text-ink sm:text-5xl">{title}</h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function Tag({ children, active = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] transition-colors ${
        active ? 'border-accent/60 bg-accent/10 text-accent' : 'border-line text-muted'
      }`}
    >
      {children}
    </span>
  );
}
