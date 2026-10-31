# Mohamed Abo El-azm — Portfolio

A bilingual (English / Arabic) personal portfolio for Mohamed Abo El-azm, Full Stack Developer. Built with React 19, Vite, Tailwind CSS v4, GSAP, Zustand and React Icons.

## Features

- **Bilingual with full RTL support** — English (LTR) and Arabic (RTL), including translated metadata, document `lang`/`dir`, and Arabic typography.
- **Seamless dark / light themes** — system-aware on first visit, persisted across reloads, with no flash of the wrong theme.
- **Motion with intent** — GSAP hero intro, scroll-triggered reveals, marquee, hover micro-interactions, and a scroll progress bar.
- **Responsive by design** — tested from 390 px to 1440 px with no horizontal overflow; dedicated mobile menu with scroll lock and keyboard support.
- **Accessible interactions** — skip link, focus management, `inert` mobile menu, ARIA labels, and AA-contrast text.
- **Real project showcase** — live demos and source links for Mercato, Skillline and Walletly.
- **Experience & credentials** — an EraaSoft mentoring timeline, technical internships, and certificate cards for the IBM P-TECH Flutter internship and the EraaSoft Front-End Diploma.
- **WhatsApp contact form** — composes a pre-filled message and opens WhatsApp, no backend required.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 19 + Vite |
| Routing | React Router |
| Styling | Tailwind CSS v4 (raw utility classes) |
| Animation | GSAP + `@gsap/react` |
| State | Zustand (persisted theme, language, menu) |
| Icons | React Icons |
| Linting | Oxlint |

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

### Scripts

```bash
npm run dev      # start development server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # run Oxlint
```

## Project structure

```
src/
├─ app/          # App shell and routes
├─ components/   # Reusable UI, layout and project previews
├─ data/         # Profile, projects and skills data
├─ hooks/        # Scroll, preferences, reveal and body-lock hooks
├─ i18n/         # English and Arabic copy
├─ layouts/      # Main page layout
├─ lib/          # GSAP setup
├─ pages/        # Home and 404 pages
├─ sections/     # Hero, About, Skills, Projects, Contact
├─ store/        # Zustand app store
└─ utils/        # Small helpers (class names)
```

## Customizing content

- **Text and translations** — edit `src/i18n/en.js` and `src/i18n/ar.js`. Both files share the same shape, so add a key to one and mirror it in the other.
- **Projects** — edit `src/data/projects.js` for links, stack and order; project copy lives under `projects.items` in the i18n files.
- **Experience** — edit `src/data/experience.js` and the matching copy under `experience.items` in both i18n files.
- **Certifications** — edit `src/data/certifications.js` (grade badges) and the copy under `certifications.items` in both i18n files.
- **Skills** — edit `src/data/skills.js` and the matching category copy in the i18n files.
- **Profile links and avatar** — edit `src/data/profile.js`; replace `public/mohamed-avatar.jpg` to change the portrait.
- **Site metadata** — update `index.html` for the title, description, Open Graph tags and JSON-LD.

## Deployment

`npm run build` outputs a static site to `dist/`. Deploy it to Vercel, Netlify, GitHub Pages or any static host. The app uses hash-based section navigation, so no server rewrite rules are required.
