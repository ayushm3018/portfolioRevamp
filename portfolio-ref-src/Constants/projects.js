/**
 * Project data for the Projects section.
 *
 * `live` and `github` are both nullable. The card reads them to decide what it is:
 *   live set        -> hover mounts a live iframe, click opens the BrowserWindow modal
 *   live null + github -> no iframe, click opens the repo
 *   both null       -> poster only, not clickable
 *
 * `openInNewTab: true` skips the modal and opens a real tab instead. Use it for
 * full-stack apps: Google sign-in popups, cookies and OAuth redirects don't
 * survive being framed, so the modal would show a broken session. The hover
 * preview still works — it only ever shows the public landing page.
 *
 * `posterAspect` is the masonry lever — varying it is what makes the columns
 * end at different heights instead of bottoming out flush.
 *
 * IMPORTANT: the poster is rendered with object-fit: cover, so a box NARROWER
 * than the image crops the sides, and a box WIDER crops the bottom. A standard
 * 1440x900 viewport capture is ~1.6-1.8 wide; boxing one at 4/3 shaves ~27% off
 * the sides, which eats the logo and the top-right nav. So:
 *
 *   - viewport capture (wide, ~16/9)  -> posterAspect "16/9" or wider. Safe.
 *   - want a TALL card for masonry?   -> capture a FULL-PAGE screenshot rather
 *                                        than narrowing the box. A tall source
 *                                        can sit in "4/3" or "3/4" losing only
 *                                        the bottom of the page, not the chrome.
 *
 * Posters live in public/posters/ and are referenced by absolute path (this
 * project has no image pipeline, so keep them under ~150KB by hand).
 */
export const projects = [
  {
    id: 3,
    title: "Assessly",
    subtitle: "AI-Proctored Interview Platform",
    year: 2026,
    live: "https://assessly.ddnsgeek.com/",
    github: null,
    openInNewTab: true,
    poster: "/posters/assessly.jpg",
    posterAspect: "16/10",
    description:
      "An AI mock-interview platform that grounds its questions in your resume and injects follow-ups from your own answers, driven by DeepSeek V3, with a low-latency Deepgram voice pipeline and MediaPipe proctoring.",
    tags: ["React 19", "Node.js", "MongoDB", "DeepSeek V3", "Deepgram", "MediaPipe"],
  },
  {
    id: 5,
    title: "Banking Ledger",
    subtitle: "Double-Entry Banking API",
    year: 2026,
    /* live is null on purpose: the Render free-tier demo in the README was
       unreachable, and a hover preview would wake it on every mouseover. */
    live: null,
    github: "https://github.com/ayushm3018/bankLedger-backend",
    poster: "/posters/bankledger.png",
    posterAspect: "16/10",
    description:
      "A production-style banking API where balances are derived from MongoDB aggregation pipelines so they can never drift, idempotent transfers make a retry safe, and ACID transactions prevent double-spending.",
    tags: ["Node.js", "Express 5", "MongoDB", "Mongoose", "JWT", "Nodemailer"],
  },
  {
    id: 4,
    title: "CodeSync",
    subtitle: "Multiplayer IDE",
    year: 2026,
    live: "https://code-sync.duckdns.org/",
    github: null,
    openInNewTab: true,
    poster: "/posters/codesync.jpg",
    posterAspect: "16/10",
    description:
      "A multiplayer IDE where several people edit one file with zero conflicts, backed by Yjs CRDTs over Socket.io. Runs code in sandboxed Docker containers across 12 languages, with a Gemini pair-programmer built in.",
    tags: ["React", "Yjs CRDT", "Socket.io", "Redis", "Docker", "Gemini API"],
  },
  {
    id: 1,
    title: "DelhiMart",
    subtitle: "E-Commerce SPA",
    year: 2025,
    live: "https://delhimart.netlify.app/",
    github: null,
    poster: "/posters/delhimart.jpg",
    posterAspect: "16/9",
    description:
      "A client-side e-commerce SPA implementing end-to-end shopping flows, cart, checkout, wishlist, order tracking, PIN code-based delivery, and multi-criteria filtering across 60+ products.",
    tags: [
      "React 18",
      "Vite 5",
      "Tailwind CSS",
      "React Router DOM",
      "Context API",
      "useReducer",
    ],
  },
  {
    id: 2,
    title: "SocialVibe",
    subtitle: "Social Media Platform",
    year: 2025,
    live: "https://socialvibee.netlify.app/",
    github: null,
    poster: "/posters/socialvibe.jpg",
    posterAspect: "16/9",
    description:
      "A full-featured client-side social media platform with auth flows, infinite scroll feeds, stories, DMs, and debounced search, with localStorage based persistence across sessions.",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Context API"],
  },
];
