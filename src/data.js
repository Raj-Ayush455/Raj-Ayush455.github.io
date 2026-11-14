// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Ayush Raj',
  initials: 'AR',
  role: 'AI & Backend Engineer',
  location: 'Ranchi, India',
  email: 'rajayush455@gmail.com',
  status: 'Open to full-time roles & 6-month internships · immediate joiner',
  rotating: ['LLM systems', 'Go gateways', 'Java services', 'K8s tooling', 'speech models'],
  intro:
    'I build the layer under AI products: fast, correct backends and the infrastructure that serves models in production. Undergrad in CSE (AI & ML) at BIT Mesra, competitive programmer, and previously an AI Engineer intern at Ericsson.',
  links: {
    github: 'https://github.com/Raj-Ayush455',
    linkedin: 'https://linkedin.com/in/ayush-raj-23064928b',
    codeforces: 'https://codeforces.com/profile/freakycoder_151',
  },
};

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const stats = [
  { value: 18.8, suffix: 'M', decimals: 1, label: 'rate-limit checks / sec on 8 cores' },
  { value: 129, prefix: '#', label: 'of 34,000+ teams, ICPC 2026 Online Challenge' },
  { value: 92.3, suffix: '%', decimals: 1, label: 'out-of-distribution Hindi accuracy' },
  { value: 550, suffix: '+', label: 'DSA problems solved' },
];

export const about = {
  paragraphs: [
    "I like problems where correctness and speed both matter: a rate limiter that has to agree across replicas, a dispute workflow that can't lose an audit trail, a speech model that has to work on accents it never saw in training.",
    'Most of my work sits between ML and systems. I train and fine-tune models in PyTorch, then write the Go, Java or Python services and the Kubernetes plumbing that put them in front of users.',
  ],
  now: [
    'Looking for a full-time role or a 6-month internship',
    'Still building on the early-fusion audio LLM',
    'Competing on Codeforces',
  ],
  facts: [
    { k: 'Based in', v: 'Ranchi, India · open to relocate' },
    { k: 'Focus', v: 'Applied AI · backend · infra' },
    { k: 'Availability', v: 'Immediate, no college commitments' },
    { k: 'Codeforces', v: 'Specialist (freakycoder_151)' },
  ],
};

export const experience = [
  {
    company: 'Ericsson',
    role: 'AI Engineer Intern',
    period: 'May 2026 – Aug 2026',
    stack: ['Python', 'Kubernetes', 'Bash', 'Sockets'],
    summary: 'Diagnostics and monitoring automation for multi-node telecom clusters.',
    points: [
      'Built a suite of 8 health-monitoring scripts in Python + kubectl, cutting multi-node cluster triage time by 42% on production-mirror testbeds.',
      'Developed a CPU Capacity Auditor, PVC binding verifier and TLS Certificate Expiry Monitor that flag risks 7 days before they could cause node outages.',
      'Validated L3/L4 path integrity with low-level sockets, confirming 100% firewall rule compliance across OAM, Signaling and CH planes, with async pipelines reporting in under 500 ms.',
    ],
  },
  {
    company: 'AgriPulse',
    role: 'SDE Intern',
    period: 'Oct 2025 – Mar 2026',
    stack: ['Python', 'FastAPI', 'Next.js', 'Gemini', 'Sensors'],
    summary: 'Hardware-to-UI soil suitability platform for farmers.',
    points: [
      'Built a Next.js + FastAPI platform that streams live NPK, pH, moisture and weather readings from field sensors over Wi-Fi or Serial.',
      'Developed a crop-evaluation rules engine that checks live readings against a reference dataset and flags deficiencies.',
      'Added Google Gemini soil analysis behind prompt-injection safeguards.',
    ],
  },
];

export const projectFilters = ['All', 'AI / ML', 'Backend', 'Infra'];

export const projects = [
  {
    id: 'extinct',
    title: 'Extinct',
    tagline: 'Self-hosted personal AI agent you text on Telegram',
    year: '2026',
    categories: ['AI / ML', 'Backend'],
    stack: ['Python', 'Temporal', 'Playwright', 'Docker', 'PostgreSQL'],
    repo: 'https://github.com/Raj-Ayush455/extinct',
    metrics: [
      { v: '177', l: 'tests' },
      { v: '0', l: 'lost or repeated actions on crash' },
      { v: '4', l: 'Docker services, localhost only' },
    ],
    points: [
      'Temporal workflows run every conversation turn (one workflow per user, signals, debounce, timers), so a crashed worker loses nothing and never repeats an action.',
      'Tool-calling loop where the model decides and code acts: Gmail via OAuth, memory, cron-scheduled tasks, and its own Chrome in Docker with a noVNC live view for human takeover on logins and CAPTCHAs.',
      'Email and web text are tagged untrusted behind a prompt-injection guard; risky actions need a Telegram button tap; secrets are AES-GCM envelope-encrypted.',
    ],
  },
  {
    id: 'limitplane',
    title: 'LimitPlane',
    tagline: 'Multi-tenant rate-limiting gateway',
    year: '2026',
    categories: ['Backend', 'Infra'],
    stack: ['Go', 'Redis', 'Kubernetes', 'Docker', 'Helm'],
    repo: 'https://github.com/Raj-Ayush455/LimitPlane',
    metrics: [
      { v: '18.8M', l: 'checks/sec' },
      { v: '47K', l: 'req/sec end-to-end' },
      { v: '<1s', l: 'live limit update' },
    ],
    points: [
      'Zero third-party dependencies: hand-written Redis RESP client, JWT and WebSocket server. Requests are priced by cost class (heavy AI routes cost 5 tokens, light ones 1).',
      'Lock-striped token bucket with zero allocations; sharding alone gave a 4.5x speedup.',
      '8 rate-limiting algorithms plus atomic Redis Lua scripts for correct multi-replica limits, with 400+ tests passing under the race detector in CI.',
      'Limits are Kubernetes CRDs with a custom controller and Helm chart: kubectl patch updates a live limit in under a second, with zero restarts.',
    ],
    demo: 'bucket',
  },
  {
    id: 'audio-llm',
    title: 'Early-Fusion Audio LLM',
    tagline: 'Speech encoders wired straight into LLMs',
    year: '2026 – now',
    categories: ['AI / ML'],
    stack: ['Python', 'PyTorch', 'Hugging Face', 'PEFT / LoRA'],
    repo: 'https://github.com/Raj-Ayush455/Early-Fusion-Multimodal-LLM',
    metrics: [
      { v: '950K+', l: 'Indic speech clips' },
      { v: '92.3%', l: 'OOD Hindi accuracy' },
      { v: '0.59%', l: 'params trained (LoRA)' },
    ],
    points: [
      'Connects speech encoders (IndicConformer-600M, Whisper) directly to LLMs (Krutrim-1, Llama-3 8B) through a SwiGLU/RMSNorm projection bridge (1024-D to 4608-D), removing the text bottleneck.',
      'Trained on 950K+ multilingual Indic speech samples, reaching 0.1401 validation loss.',
      'Two-stage LoRA fine-tuning for stuttered-speech detection on the Boli and KSoF corpora: loss fell 88% (11.03 to 1.33).',
    ],
    demo: 'pipeline',
  },
  {
    id: 'disputedesk',
    title: 'DisputeDesk',
    tagline: 'Chargeback & dispute management service',
    year: '2026',
    categories: ['Backend'],
    stack: ['Java 21', 'Spring Boot', 'Hibernate', 'Azure', 'Entra ID'],
    repo: 'https://github.com/Raj-Ayush455/disputedesk',
    metrics: [
      { v: '3', l: 'roles, row-level auth' },
      { v: '5 min', l: 'read-only SAS links' },
      { v: '0', l: 'N+1 queries (tested)' },
    ],
    points: [
      'Spring Boot + JPA service with a domain state machine that enforces the dispute lifecycle and its deadlines, plus full revision history via Hibernate Envers.',
      'Spring Security with Entra ID JWTs across 3 roles and row-level authorization in every query. Evidence lives in Azure Blob Storage behind 5-minute read-only SAS links.',
      'Fixed N+1 queries with entity graphs (proven by query-count tests), disabled open-session-in-view and added optimistic locking (@Version + ETags).',
    ],
    demo: 'states',
  },
];

// `used` links each skill to where it was applied, shown when a skill is selected.
export const stack = [
  {
    group: 'Languages',
    items: [
      { name: 'Go', used: ['LimitPlane'] },
      { name: 'Python', used: ['Ericsson', 'AgriPulse', 'Audio LLM'] },
      { name: 'Java', used: ['DisputeDesk'] },
      { name: 'C++', used: ['Competitive programming'] },
      { name: 'C', used: ['Coursework'] },
      { name: 'SQL', used: ['DisputeDesk', 'AgriPulse'] },
      { name: 'Bash', used: ['Ericsson'] },
    ],
  },
  {
    group: 'AI / ML',
    items: [
      { name: 'PyTorch', used: ['Audio LLM'] },
      { name: 'Hugging Face', used: ['Audio LLM'] },
      { name: 'PEFT / LoRA', used: ['Audio LLM'] },
      { name: 'LangChain', used: ['Agent prototypes'] },
      { name: 'LangGraph', used: ['Agent prototypes'] },
      { name: 'Gemini API', used: ['AgriPulse'] },
      { name: 'scikit-learn', used: ['Coursework'] },
      { name: 'TensorFlow', used: ['Coursework'] },
      { name: 'Pandas / NumPy', used: ['Audio LLM', 'AgriPulse'] },
    ],
  },
  {
    group: 'Backend',
    items: [
      { name: 'Spring Boot', used: ['DisputeDesk'] },
      { name: 'Hibernate / JPA', used: ['DisputeDesk'] },
      { name: 'FastAPI', used: ['AgriPulse'] },
      { name: 'Next.js', used: ['AgriPulse'] },
      { name: 'PostgreSQL', used: ['DisputeDesk'] },
      { name: 'Redis', used: ['LimitPlane'] },
      { name: 'WebSockets', used: ['LimitPlane'] },
      { name: 'REST APIs', used: ['LimitPlane', 'DisputeDesk', 'AgriPulse'] },
    ],
  },
  {
    group: 'Infra & Tools',
    items: [
      { name: 'Kubernetes', used: ['Ericsson', 'LimitPlane'] },
      { name: 'Helm / CRDs', used: ['LimitPlane'] },
      { name: 'Docker', used: ['LimitPlane'] },
      { name: 'Azure', used: ['DisputeDesk'] },
      { name: 'Envoy', used: ['Gateway experiments'] },
      { name: 'Linux', used: ['Ericsson'] },
      { name: 'GitHub Actions', used: ['LimitPlane CI'] },
      { name: 'Jenkins', used: ['Ericsson'] },
    ],
  },
];

export const achievements = [
  { big: '#129', title: 'ICPC 2026 Online Challenge', detail: 'Out of 34,000+ teams, powered by Huawei.' },
  { big: 'Specialist', title: 'Codeforces', detail: 'Handle freakycoder_151 · 550+ DSA problems solved.', link: 'https://codeforces.com/profile/freakycoder_151' },
  { big: 'Top 150', title: 'SEBI Securities Market TechSprint', detail: 'Finalist out of 3,000+ teams.' },
  { big: '#289', title: 'Amazon ML Challenge 2026', detail: 'Out of 35,000+ teams.' },
  { big: '5★', title: 'HackerRank', detail: 'C++, Java and Python.' },
  { big: 'Lead', title: 'GDSC, BIT Mesra', detail: 'Tech Lead for the Google Developer Student Club.' },
];

export const education = {
  school: 'Birla Institute of Technology, Mesra',
  degree: 'B.Tech, Computer Science & Engineering',
  spec: 'Specialization in AI & ML',
  place: 'Ranchi, India',
  cgpa: '8.01',
  coursework: ['Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'Machine Learning', 'Deep Learning', 'NLP'],
  extras: ['GDSC Tech Lead', 'NPTEL certified: Data Science', 'NPTEL certified: NLP'],
};
