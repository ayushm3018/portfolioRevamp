# Ayush Mishra — Portfolio

My personal portfolio site. Built with React 19 + Vite, with WebGL 3D, GSAP scroll animations, and a few custom canvas effects.

**Live:** [ayush-mishra.com](https://ayush-mishra.com/)

## Tech Stack

- **Framework:** React 19, Vite 6
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP + ScrollTrigger, Framer Motion
- **3D / WebGL:** Spline, React Three Fiber, Three.js
- **Particles:** tsparticles + custom canvas particle systems
- **Routing:** React Router v7

## Features

- Sticky 3D Spline hero scene with scroll-driven transforms
- Typing intro section synced to scroll progress
- Interactive `</>` particle field — particles scatter from cursor and spring back like water
- Live iframe project previews
- GSAP-animated experience timeline
- LeetCode stats with heatmap and rating chart
- Full SEO setup (Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt)

## Sections

| Section | What it does |
|---|---|
| `Hero / SplineScene` | Spline 3D scene, sticky on desktop |
| `Div2` | Scroll-synced typing intro |
| `Skills` | Framer Motion skill icon grid |
| `Projects` | Project cards with live iframe previews |
| `Experience` | GSAP ScrollTrigger timeline |
| `Community` | Custom canvas particle text + leadership cards |
| `LeetCode` | Stats, heatmap, rating chart |

## Getting Started

```bash
# install
npm install

# dev
npm run dev

# build
npm run build

# preview build
npm run preview

# lint
npm run lint
```

## Project Structure

```
portfolio-ref-src/
├── assets/              # Hero, Navbar, Spline, particles, typing
├── components/          # Skills, Projects, Experience, Community, LeetCode, Loader
├── Constants/           # Static data
├── public/              # OG image, robots.txt, sitemap.xml
├── App.jsx              # Layout + mobile/desktop switch
├── index.html           # SEO meta, OG, JSON-LD
└── vite.config.js
```

## Deployment

Deployed on Netlify. `netlify.toml` lives in the parent repo root.

## Contact

- **Site:** [ayush-mishra.com](https://ayush-mishra.com/)
- **Email:** ayushmishra3018@gmail.com
