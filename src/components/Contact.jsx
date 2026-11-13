import { useState } from 'react';
import { profile } from '../data';
import { Arrow, Chart, Check, Copy, GitHub, LinkedIn, Mail } from './Icons';
import { Reveal, Section } from './ui';

const field =
  'w-full rounded-lg border border-line bg-bg/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent/70';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', message: '' });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  // No backend: the form opens the visitor's mail app with everything filled in.
  const send = (e) => {
    e.preventDefault();
    const subject = `Hello from ${form.name || 'your portfolio'}${form.company ? ` (${form.company})` : ''}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(form.message)}`;
  };

  const links = [
    { label: 'GitHub', sub: 'Raj-Ayush455', href: profile.links.github, Icon: GitHub },
    { label: 'LinkedIn', sub: 'ayush-raj', href: profile.links.linkedin, Icon: LinkedIn },
    { label: 'Codeforces', sub: 'freakycoder_151', href: profile.links.codeforces, Icon: Chart },
  ];

  return (
    <Section id="contact" index="07" kicker="contact" title="Let's talk">
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
            I'm looking for a full-time role or a 6-month internship, and I can join immediately. If you're building something in AI, backend or infra, I'd love to hear about it.
          </p>

          <button
            onClick={copy}
            className="group mt-8 flex w-full items-center justify-between gap-4 rounded-xl border border-line bg-surface px-5 py-4 text-left transition-colors hover:border-accent/60"
          >
            <span className="flex items-center gap-3 min-w-0">
              <Mail className="shrink-0 text-accent" />
              <span className="truncate text-ink">{profile.email}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-muted">
              {copied ? (
                <>
                  <Check width={14} height={14} className="text-accent" /> copied
                </>
              ) : (
                <>
                  <Copy width={14} height={14} /> copy
                </>
              )}
            </span>
          </button>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {links.map(({ label, sub, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/60"
              >
                <div className="flex items-center justify-between text-muted">
                  <Icon width={17} height={17} />
                  <Arrow width={13} height={13} className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-4 text-sm text-ink">{label}</p>
                <p className="truncate text-xs text-faint">{sub}</p>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={send} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs text-muted">Your name</span>
                <input className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs text-muted">Company</span>
                <input className={field} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme AI" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs text-muted">Message</span>
              <textarea
                className={`${field} min-h-36 resize-y`}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="We're hiring for…"
                required
              />
            </label>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-xs text-faint">Opens your email app, nothing is stored.</p>
              <button type="submit" className="rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90">
                Send message
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
