import { useEffect, useMemo, useRef, useState } from 'react';
import { profile, projects, sections } from '../data';
import { scrollToId } from '../hooks';
import { Search } from './Icons';

export default function CommandPalette({ open, onClose, onToggleTheme }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  const actions = useMemo(
    () => [
      ...sections.map((s) => ({ group: 'Go to', label: s.label, run: () => scrollToId(s.id) })),
      ...projects.map((p) => ({ group: 'Projects', label: `${p.title} on GitHub`, run: () => window.open(p.repo, '_blank', 'noopener') })),
      { group: 'Actions', label: 'Copy email address', run: () => navigator.clipboard?.writeText(profile.email) },
      { group: 'Actions', label: 'Toggle light / dark theme', run: onToggleTheme },
      { group: 'Links', label: 'Open GitHub profile', run: () => window.open(profile.links.github, '_blank', 'noopener') },
      { group: 'Links', label: 'Open LinkedIn', run: () => window.open(profile.links.linkedin, '_blank', 'noopener') },
      { group: 'Links', label: 'Open Codeforces', run: () => window.open(profile.links.codeforces, '_blank', 'noopener') },
    ],
    [onToggleTheme],
  );

  const results = actions.filter((a) => `${a.group} ${a.label}`.toLowerCase().includes(q.trim().toLowerCase()));

  useEffect(() => {
    if (open) {
      setQ('');
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);
  useEffect(() => setIdx(0), [q]);

  if (!open) return null;

  const exec = (a) => {
    onClose();
    setTimeout(a.run, 50);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[idx]) exec(results[idx]);
    else if (e.key === 'Escape') onClose();
  };

  let lastGroup = null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[14vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="text-faint" />
          <input
            ref={inputRef}
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Jump to a section, open a project…"
            className="h-12 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-faint"
          />
          <kbd className="font-mono text-[10px] text-faint">esc</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-faint">No matches</li>}
          {results.map((a, i) => {
            const header = a.group !== lastGroup;
            lastGroup = a.group;
            return (
              <li key={a.group + a.label}>
                {header && <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{a.group}</p>}
                <button
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => exec(a)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${i === idx ? 'bg-surface-2 text-ink' : 'text-muted'}`}
                >
                  {a.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
