import { useEffect, useRef, useState } from 'react';
import { experience, profile, projects, sections, stack } from '../data';
import { scrollToId } from '../hooks';

const HELP = [
  'help              list commands',
  'whoami            short intro',
  'projects          what I have built',
  'experience        where I have worked',
  'stack             languages and tools',
  'contact           how to reach me',
  'goto <section>    scroll to a section',
  'clear             clear the screen',
];

function run(raw) {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  switch ((cmd || '').toLowerCase()) {
    case '':
      return [];
    case 'help':
      return HELP;
    case 'whoami':
      return [`${profile.name}, ${profile.role.toLowerCase()}`, 'undergrad, CSE (AI & ML) @ BIT Mesra', profile.status.toLowerCase()];
    case 'projects':
    case 'ls':
      return projects.map((p) => `${p.title} · ${p.tagline.toLowerCase()}`);
    case 'experience':
      return experience.map((e) => `${e.company.padEnd(12)}${e.role.toLowerCase()} · ${e.period}`);
    case 'stack':
      return stack.map((g) => `${(g.group.toLowerCase() + ':').padEnd(15)}${g.items.slice(0, 5).map((i) => i.name).join(', ')}`);
    case 'contact':
      return [`email     ${profile.email}`, 'github    github.com/Raj-Ayush455', 'linkedin  in/ayush-raj-23064928b'];
    case 'goto':
    case 'cd': {
      const q = (args[0] || '').toLowerCase();
      const s = sections.find((x) => x.id === q || x.label.toLowerCase().startsWith(q));
      if (!q || !s) return [`usage: goto <${sections.map((x) => x.id).join('|')}>`];
      setTimeout(() => scrollToId(s.id), 150);
      return [`→ scrolling to ${s.label.toLowerCase()}`];
    }
    case 'sudo':
      return ['nice try. hire me instead?'];
    default:
      return [`command not found: ${cmd}. try 'help'`];
  }
}

export default function Terminal() {
  const [lines, setLines] = useState(() => [
    { kind: 'in', text: 'whoami' },
    ...run('whoami').map((text) => ({ kind: 'out', text })),
    { kind: 'hint', text: "type 'help' and press enter" },
  ]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [lines]);

  const submit = (e) => {
    e.preventDefault();
    const cmd = value;
    setValue('');
    setHIdx(-1);
    if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 30));
    if (cmd.trim().toLowerCase() === 'clear') return setLines([]);
    setLines((l) => [...l, { kind: 'in', text: cmd }, ...run(cmd).map((text) => ({ kind: 'out', text }))]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const n = Math.min(hIdx + 1, history.length - 1);
      setHIdx(n);
      setValue(history[n]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = hIdx - 1;
      setHIdx(Math.max(n, -1));
      setValue(n >= 0 ? history[n] : '');
    }
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 font-mono text-[11px] text-faint">ayush@portfolio: ~</span>
      </div>
      <div ref={bodyRef} className="h-72 overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className={l.kind === 'in' ? 'text-ink' : l.kind === 'hint' ? 'text-faint' : 'whitespace-pre-wrap text-muted'}>
            {l.kind === 'in' && <span className="mr-2 text-accent">❯</span>}
            {l.text}
          </div>
        ))}
        <form onSubmit={submit} className="flex items-center">
          <span className="mr-2 text-accent">❯</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent text-ink caret-[var(--accent)] outline-none placeholder:text-faint"
            placeholder="help"
            aria-label="Terminal command"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
