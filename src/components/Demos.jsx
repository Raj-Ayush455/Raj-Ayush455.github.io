import { useEffect, useRef, useState } from 'react';

/* ---------- LimitPlane: token bucket with cost classes ---------- */
const CAP = 10;
const RATE = 2; // tokens per second

export function BucketDemo() {
  const [tokens, setTokens] = useState(CAP);
  const [log, setLog] = useState([]);
  const state = useRef({ tokens: CAP, last: performance.now() });

  useEffect(() => {
    let raf;
    const tick = (t) => {
      const s = state.current;
      s.tokens = Math.min(CAP, s.tokens + ((t - s.last) / 1000) * RATE);
      s.last = t;
      setTokens(s.tokens);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const hit = (cost, label, n = 1) => {
    const entries = [];
    for (let i = 0; i < n; i++) {
      const s = state.current;
      if (s.tokens >= cost) {
        s.tokens -= cost;
        entries.push({ ok: true, text: `200  ${label.padEnd(6)} -${cost}  ${s.tokens.toFixed(1)} left` });
      } else {
        const wait = ((cost - s.tokens) / RATE).toFixed(1);
        entries.push({ ok: false, text: `429  ${label.padEnd(6)} retry-after ${wait}s` });
      }
    }
    setTokens(state.current.tokens);
    setLog((l) => [...entries.reverse(), ...l].slice(0, 6));
  };

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[11px] uppercase tracking-wider text-faint">tenant: acme · bucket</p>
        <p className="font-mono text-xs text-muted">
          <span className="text-ink">{tokens.toFixed(1)}</span> / {CAP} tokens · +{RATE}/s
        </p>
      </div>
      <div className="mt-3 grid grid-cols-10 gap-1" aria-label={`${tokens.toFixed(1)} of ${CAP} tokens`}>
        {Array.from({ length: CAP }, (_, i) => {
          const fill = Math.max(0, Math.min(1, tokens - i));
          return (
            <div key={i} className="relative h-7 overflow-hidden rounded-[4px] bg-surface-2">
              <div className="absolute inset-x-0 bottom-0 bg-accent/80" style={{ height: `${fill * 100}%` }} />
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <DemoButton onClick={() => hit(1, 'light')}>light route · 1</DemoButton>
        <DemoButton onClick={() => hit(5, 'ai')}>AI route · 5</DemoButton>
        <DemoButton onClick={() => hit(1, 'light', 8)}>burst ×8</DemoButton>
      </div>
      <div className="mt-4 h-[118px] overflow-hidden rounded-lg border border-line bg-bg/60 p-3 font-mono text-[11.5px] leading-[1.55]">
        {log.length === 0 ? (
          <p className="text-faint">send a few requests and watch the bucket drain</p>
        ) : (
          log.map((e, i) => (
            <p key={i} className={`whitespace-pre ${e.ok ? 'text-muted' : 'text-danger'}`} style={{ opacity: 1 - i * 0.13 }}>
              {e.text}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

/* ---------- Audio LLM: early-fusion pipeline ---------- */
const STAGES = [
  { k: 'audio', name: 'Speech', shape: '16 kHz waveform', note: 'Raw Indic speech clip. No transcript is produced on the way in.' },
  { k: 'enc', name: 'IndicConformer', shape: 'T × 1024', note: '600M-param speech encoder (Whisper also supported) turns audio into frame embeddings.' },
  { k: 'bridge', name: 'Projection bridge', shape: '1024 → 4608', note: 'SwiGLU + RMSNorm projector maps audio frames into the LLM embedding space.' },
  { k: 'llm', name: 'LLM', shape: 'Krutrim-1 · Llama-3 8B', note: 'Audio embeddings are fused with the text prompt at the input, so the model reasons over sound directly.' },
  { k: 'out', name: 'Output', shape: 'text', note: 'Transcription, answers, or stutter labels after two-stage LoRA fine-tuning.' },
];

export function PipelineDemo() {
  const [active, setActive] = useState(-1);
  const [picked, setPicked] = useState(2);
  const timer = useRef();

  const play = () => {
    clearInterval(timer.current);
    let i = 0;
    setActive(0);
    setPicked(0);
    timer.current = setInterval(() => {
      i += 1;
      if (i >= STAGES.length) {
        clearInterval(timer.current);
        setTimeout(() => setActive(-1), 700);
        return;
      }
      setActive(i);
      setPicked(i);
    }, 650);
  };
  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-wider text-faint">early fusion · no text bottleneck</p>
        <DemoButton onClick={play}>run ▸</DemoButton>
      </div>
      <ol className="mt-4 space-y-1.5">
        {STAGES.map((s, i) => {
          const on = active === i;
          const sel = picked === i;
          return (
            <li key={s.k}>
              <button
                onClick={() => setPicked(i)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-all duration-300 ${
                  on ? 'border-accent bg-accent/15' : sel ? 'border-accent/40 bg-surface-2' : 'border-line hover:border-faint/60'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className={`font-mono text-[10px] ${on || sel ? 'text-accent' : 'text-faint'}`}>0{i + 1}</span>
                  <span className="text-sm text-ink">{s.name}</span>
                </span>
                <span className="font-mono text-[11px] text-muted">{s.shape}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 min-h-[3.2em] text-[13px] leading-relaxed text-muted">{STAGES[picked].note}</p>
    </div>
  );
}

/* ---------- DisputeDesk: lifecycle state machine ---------- */
const TRANSITIONS = {
  OPENED: { requestEvidence: 'EVIDENCE_REQUESTED', accept: 'ACCEPTED' },
  EVIDENCE_REQUESTED: { submitEvidence: 'EVIDENCE_SUBMITTED', expire: 'LOST' },
  EVIDENCE_SUBMITTED: { review: 'UNDER_REVIEW' },
  UNDER_REVIEW: { win: 'WON', lose: 'LOST' },
  WON: {},
  LOST: {},
  ACCEPTED: {},
};
const EVENTS = ['requestEvidence', 'submitEvidence', 'review', 'win', 'lose', 'accept', 'expire'];

export function StatesDemo() {
  const [state, setState] = useState('OPENED');
  const [rev, setRev] = useState([{ n: 1, text: 'OPENED', ok: true }]);

  const fire = (ev) => {
    const next = TRANSITIONS[state][ev];
    setRev((r) => {
      const n = r[0].n + 1;
      const entry = next ? { n, text: `${ev} → ${next}`, ok: true } : { n: r[0].n, text: `409 ${ev} not allowed from ${state}`, ok: false };
      return [entry, ...r].slice(0, 5);
    });
    if (next) setState(next);
  };
  const terminal = Object.keys(TRANSITIONS[state]).length === 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-wider text-faint">dispute #4821 · state</p>
        <button onClick={() => (setState('OPENED'), setRev([{ n: 1, text: 'OPENED', ok: true }]))} className="font-mono text-[11px] text-faint hover:text-ink">
          reset
        </button>
      </div>
      <p className="mt-2 font-mono text-lg text-ink">
        {state}
        {terminal && <span className="ml-2 text-xs text-faint">(final)</span>}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {EVENTS.map((ev) => {
          const valid = Boolean(TRANSITIONS[state][ev]);
          return (
            <button
              key={ev}
              onClick={() => fire(ev)}
              className={`rounded-md border px-2 py-1 font-mono text-[11px] transition-colors ${
                valid ? 'border-accent/50 text-ink hover:bg-accent/10' : 'border-line text-faint hover:text-muted'
              }`}
            >
              {ev}()
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-lg border border-line bg-bg/60 p-3 font-mono text-[11.5px] leading-[1.6]">
        <p className="mb-1 text-faint">audit history (envers)</p>
        {rev.map((r, i) => (
          <p key={i} className={r.ok ? 'text-muted' : 'text-danger'}>
            {r.ok ? `rev ${String(r.n).padStart(2, '0')}  ` : '        '}
            {r.text}
          </p>
        ))}
      </div>
    </div>
  );
}

function DemoButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-[11px] text-ink transition-colors hover:border-accent/60 active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
