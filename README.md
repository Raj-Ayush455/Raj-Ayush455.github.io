# Ayush Raj — portfolio

Single-page portfolio built with React 19, Vite 7 and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

- **Content:** everything (experience, projects, skills, achievements, education, links) lives in `src/data.js`.
- **Colours:** theme tokens are in `src/index.css` (`--bg`, `--ink`, `--accent`, …) for both dark and light.
- **Sections:** each is a component in `src/components/`. The sticky navbar scroll-spies them by `id`.
- **Deploy:** push to GitHub and import the repo on Vercel or Netlify (framework preset: Vite), or upload `dist/` anywhere.

Interactive bits: section scroll-spy with a sliding pill, scroll progress bar, light/dark toggle, a working mini terminal in the hero, a Ctrl/⌘+K command menu, count-up stats, expandable experience timeline, project filters, a live token-bucket demo (LimitPlane), an animated model pipeline (audio LLM), a dispute state machine with audit log (DisputeDesk), a skill explorer that shows where each tool was used, copy-to-clipboard email, and a contact form that opens your mail app.
