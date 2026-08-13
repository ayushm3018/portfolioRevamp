# Portfolio site — Ayush Mishra

Single-page React portfolio. Deployed on Netlify.

## Layout gotcha (read first)

The app is **not** in a `src/` folder. The Vite root is `portfolio-ref-src/`, and
`App.jsx`, `main.jsx`, `index.html`, `index.css` sit at the top level of it:

```
portfolioRevamp/
├── netlify.toml                  # build cmd + functions dir
├── netlify/functions/leetcode.js # LeetCode GraphQL proxy
└── portfolio-ref-src/            # <- Vite root, run npm here
    ├── App.jsx main.jsx index.html index.css vite.config.js
    ├── assets/      # page chrome: Navbar, SocialRail, Heading, Div2, SplineScene, ParticlesBackground
    ├── components/  # sections: Projects, Skills, Experience, Community, LeetCode, Loader
    ├── Constants/   # index.jsx = skill icon arrays; projects.js = project data
    └── public/      # images, resume PDF, posters/ — referenced by absolute path, never imported
```

## Commands

Run from `portfolio-ref-src/`:

- `npm run dev` — Vite dev server on :5173
- `npm run build` — production build to `dist/` (gitignored)
- `npm run lint` — **currently broken**, pre-existing. The config calls
  `reactHooks.configs.flat.recommended` but `eslint-plugin-react-hooks@5.2.0`
  only exposes `recommended` / `recommended-latest`. Fails at config load.

## Stack

React 19 + Vite 6, plain JS (`.jsx`, no TypeScript). Single page — all sections
stack in `App.jsx`, no routing despite `react-router-dom` being installed.

Animation is split three ways: **Framer Motion** (Projects, Skills, Community,
LeetCode, Loader), **GSAP + ScrollTrigger** (Div2, Experience), and raw CSS
keyframes (Heading marquee, Navbar). Match whatever the file already uses.

## Styling

Tailwind v4 via `@tailwindcss/vite`. **There is no `tailwind.config.js` and no
`@theme` block** — zero design tokens. Colors are hardcoded as arbitrary values
inline, and components freely mix Tailwind classes with React `style={{}}`
objects. Follow the surrounding file rather than trying to normalise it.

Recurring values:

- purple `#7042f8`, light purple `#b49bff`, gradient `from-[#7042f8] to-[#b49bff]`
- card surface `hsl(260,14%,8%)`, border `#2a2a2a`, page bg `#000`
- section rhythm `py-20 px-4`, headings `text-5xl font-bold`, card radius 16px
- only the `md:` (768px) breakpoint is used; JS mirrors it via `window.innerWidth < 768`.
  The one exception is `SocialRail.css`, which breaks at 1280px — that number is
  geometric (`max-w-6xl` 1152px + 2×64px rail clearance), not a device size
- `Navbar.jsx` / `Navbar.css` and `SocialRail.jsx` / `SocialRail.css` are the only
  components with their own stylesheets; everything else is Tailwind + inline styles
- no custom font is loaded anywhere — everything falls back to the system sans

## Projects section

Project data lives in `Constants/projects.js`, not in the component. Cards show a
static poster and mount a live `<iframe>` only on hover, capped at one at a time,
so the page makes zero third-party requests at rest. Don't reintroduce
always-on iframes — that was the bug this design fixed.

`live` and `github` are both nullable and decide what a card is; `openInNewTab`
skips the modal for full-stack apps whose OAuth/cookies can't survive framing.
Posters go in `public/posters/`, kept under ~150KB by hand (no image pipeline).
See the header comment in `projects.js` for the poster aspect-ratio rules.

## Deploy

Push to `main` → Netlify builds per `netlify.toml` (`npm --prefix
portfolio-ref-src install && npm run build`, publishes `portfolio-ref-src/dist`).

## Known quirks

- **The loader is gated on Spline.** `Loader` only dismisses when the Spline 3D
  scene fires `onLoad`, so anything without WebGL renders a blank page forever.
- `LeetCode.jsx` throws in local dev — it calls a Netlify function that isn't
  running. Expected; ignore it.
- `public/iframe1.png` / `iframe2.png` are dead weight (~1.6MB), superseded by
  `public/posters/`.
- `assets/Hero3D.jsx` and `components/SkillsText.jsx` are unused. `SkillsText`
  imports `@heroicons/react`, which isn't in package.json — wiring it up breaks
  the build.
