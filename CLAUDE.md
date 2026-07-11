# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15.1.6, React 18.3, TypeScript, Tailwind CSS, Framer Motion, and Recoil for state management. It's a single-page application with smooth scrolling (Lenis), scroll-based animations, a generative Three.js scene, and a custom cursor effect.

Design intent and context live in `.impeccable.md` at the repo root (target audience, brand personality, aesthetic direction, and design principles). Read it before making visual changes to stay aligned with the existing language.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev
# or
yarn dev

# Build for production
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start

# Run ESLint
npm run lint
# or
yarn lint
```

## Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:

- `@/components/*` → `components/*`
- `@/assets/*` → `assets/*`
- `@/utils/*` → `utils/*`
- `@/styles/*` → `styles/*`

Always use these aliases when importing files from these directories.

## Architecture

### Application Structure

The application follows a standard Next.js pages-based architecture with a single-page layout:

- **pages/index.tsx**: Main home page that composes all sections in order (HomeSection, Profil, Projects, Works, Skills, Contacts)
- **pages/_app.tsx**: Root application component that wraps everything with RecoilRoot and Layout, registers the Google fonts (Space Grotesk + Outfit), and initializes Lenis smooth scrolling
- **components/Layouts/**: Contains the Layout component with MainHead, SideNav, and conditional rendering based on loading state
- **components/SectionsComponents/**: Page sections organized by feature (Contacts, HomeSection, Profil, Projects, Skills, Works). Projects renders sticky project cards (StickyProjectCard, FeaturedProject, SmallProjectCard, ProjectMockup)
- **components/Shared/**: Reusable components used across the application (TyperText, AnimateBox, AnimateCursorTarget, Button, CursorComponent, FluidParticles, GenerativeScene, ImageCarousel, LanguageSwitcher, LoadingAnimatePage, PopInText, ScrollReveal, TiltCard)
- **components/SpecialComponent/**: Special-purpose components (FontAwesomeIcon, MainHead)
- **utils/**: Static data, Recoil atoms, and hooks (atomes.ts, colors.ts, links.ts, projects.ts, saluttexte.ts, skills.ts, useActiveSection.ts, useInView.ts)

### State Management

The application uses Recoil for global state management. Key atoms are defined in `utils/atomes.ts`:

- **cursorState**: Controls cursor appearance/behavior (default: "default")
- **showProverbs**: Controls loading animation visibility (default: true)

The loading state pattern: When `showProverbs` is true, the app displays `LoadingAnimatePage` component. When false, it shows the main content with navigation and sections.

### Layout System

The Layout component (`components/Layouts/index.tsx`) provides:
- Conditional rendering of SideNav based on loading state
- Left margin offset (`ml-16 md:ml-32`) to accommodate the fixed side navigation
- MainHead component for SEO and meta tags

### Data Organization

Static content is organized in the `utils/` folder:
- **projects.ts**: Featured/secondary project data rendered by the Projects section
- **skills.ts**: Skills data organized by categories
- **links.ts**: Social media and external links
- **colors.ts**: Shared color tokens
- **saluttexte.ts**: Greeting text data
- **atomes.ts**: Recoil atoms (see State Management)
- **useActiveSection.ts / useInView.ts**: Scroll/visibility hooks

### Animation Approach

The application uses multiple animation libraries:
- **Framer Motion**: Page transitions with AnimatePresence (mode="wait"), custom animated components
- **Lenis**: Smooth scrolling, initialized in `pages/_app.tsx` (dynamically imported, with `lenis/dist/lenis.css`)
- **Three.js**: Generative 3D scene (`components/Shared/GenerativeScene.tsx`), used in the Contact section and the loading screen
- TyperText component for typing animations
- ScrollReveal / PopInText for scroll-triggered text reveals
- CursorComponent for custom cursor effects

All motion respects `prefers-reduced-motion`; animate transform/opacity only.

### Internationalization (i18n)

The application supports French and English using **next-i18next**:
- **Default locale**: French (fr)
- **Available locales**: fr, en
- **Translation files**: `public/locales/{locale}/common.json`
- **Configuration**: `next-i18next.config.js`
- **Language switcher**: `components/Shared/LanguageSwitcher.tsx`

**Usage in components:**
```typescript
import { useTranslation } from 'next-i18next';

const MyComponent = () => {
  const { t } = useTranslation('common');
  return <h1>{t('greeting')}</h1>;
};
```

**Required in pages:**
```typescript
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
  },
});
```

## Styling

- Tailwind CSS for utility-first styling
- Custom styles in `styles/globals.css`
- Responsive design with mobile-first approach (breakpoints: md, lg)
- Custom cursor implementation throughout the site

## Important Notes

- The application is a single-page portfolio with section-based navigation
- All sections are rendered on the same page and use scroll-based navigation
- Mobile responsiveness is implemented (note: there's commented-out code for a mobile warning that was previously used)
- The app uses a loading animation system controlled by the `showProverbs` Recoil state
- The Contact section (`components/SectionsComponents/Contacts`) exposes direct `mailto:`/`tel:` links, social links, and a submittable contact form (`ContactForm.tsx`) wired to **Web3Forms** via `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (see `.env.example` / `CONTACT_FORM_SETUP.md`); it falls back to a `mailto:` CTA when the key is absent
- Project showcase data lives in `utils/projects.ts` (stack/type/featured/screenshots/video/link) merged **by index** with `projects.items[]` in the locale files — keep both arrays the same length and order. Screenshots live in `public/projects/`, ~15 s muted demo videos in `public/projects/demos/`
- The case-study hero renders the media on a 3D laptop/phone (`Projects/DeviceScene.tsx`, plain Three.js: drag-to-rotate, video texture for demos, WebGL fallback to the framed carousel)
- Keep strict key parity between `public/locales/fr/common.json` and `public/locales/en/common.json` (same keys, translated values); no hard-coded strings, and translate aria-labels
