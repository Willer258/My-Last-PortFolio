# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 12.2.3, TypeScript, Tailwind CSS, Framer Motion, and Recoil for state management. It's a single-page application with smooth animations and a custom cursor effect.

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

- **pages/index.tsx**: Main home page that composes all sections (HomeSection, Profil, Works, Skills, Contacts)
- **pages/_app.tsx**: Root application component that wraps everything with RecoilRoot and Layout
- **components/Layouts/**: Contains the Layout component with MainHead, SideNav, and conditional rendering based on loading state
- **components/SectionsComponents/**: Page sections organized by feature (Contacts, HomeSection, Profil, Skills, Works)
- **components/Shared/**: Reusable components used across the application (TyperText, AnimateBox, LoadingAnimatePage, CursorComponent, Logo, Button)
- **components/SpecialComponent/**: Special-purpose components (FontAwesomeIcon, MainHead)
- **utils/**: Static data and Recoil atoms (works.ts, skills.ts, links.ts, proverbes.ts, atomes.ts)

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
- **works.ts**: Work experience data with fonction, entreprise, date, description, and tasks
- **skills.ts**: Skills data organized by categories
- **links.ts**: Social media and external links
- **proverbes.ts**: Text content for animations/loading screens
- **saluttexte.ts**: Greeting text data

### Animation Approach

The application uses multiple animation libraries:
- **Framer Motion**: Page transitions with AnimatePresence (mode="wait"), custom animated components
- **GSAP + ScrollTrigger**: Advanced scroll-based animations
- TyperText component for typing animations
- CursorComponent for custom cursor effects

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
