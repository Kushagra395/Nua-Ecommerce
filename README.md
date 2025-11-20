# nua - E-Commerce Platform

A modern, full-stack e-commerce application built with React, TypeScript, and a professional tech stack focusing on performance, accessibility, and user experience.

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Setup & Run

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
\`\`\`

The app will be available at `http://localhost:5173`

---

## Design Decisions & Trade-offs

### Frontend Architecture
- **Vite + React 19 + TypeScript**: Fast build times, hot module replacement, and type safety
- **React Router v7**: Declarative routing with nested routes and lazy loading support
- **shadcn/ui + DaisyUI**: Leveraging shadcn UI components for consistent, accessible UI elements and DaisyUI's theme system for seamless dark/light mode toggling
  - Reference: Previously built PreHire and Vibely using shadcn UI and DaisyUI for theming and component consistency
  - Line 47 in `src/components/Layout/Header.tsx`: Theme toggle using DaisyUI's `theme-controller`
  - Line 82 in `src/components/ProductCard.tsx`: DaisyUI card, select, and button components

### State Management
- **Redux Toolkit + React Redux**: Centralized cart state with middleware for localStorage persistence
  - Provides type-safe reducers and automatic payload typing
  - Middleware syncs cart state to localStorage, allowing cart recovery across sessions
- **TanStack React Query**: Server state management for API data
  - 10-minute cache for products list with automatic revalidation on window focus
  - localStorage hydration for offline-first experience
  - Automatic background refetching and stale-while-revalidate patterns

### Data Fetching
- **Axios**: Consistent HTTP client with timeout, interceptors, and error handling
- **FakeStore API**: Third-party API for product data (single image per product)
  - Workaround: Display same image with CSS crops for gallery effect instead of multiple images

### Form Handling
- **react-hook-form + Zod**: Lightweight, performant form validation with excellent DX
  - Inline error messages with semantic HTML
  - Numeric validation for pincode, email regex for validation

### Accessibility & Performance
- **Lazy Loading**: Product images use `loading="lazy"` and will integrate `react-lazyload` for long lists
- **ARIA Labels**: All interactive elements have `aria-label` for screen readers
- **Keyboard Navigation**: Full keyboard support with tab order and Enter key handling on clickable divs
- **Lighthouse**: Targeting 90+ for Performance, Accessibility, Best Practices; 85+ for SEO

### UI/UX
- **Tailwind CSS v4**: Utility-first styling with semantic design tokens
- **Responsive Design**: Mobile-first approach with breakpoints for tablet, desktop, and wide screens
- **Dark Mode**: DaisyUI theme system with automatic persistence via localStorage

---

## How Previous Skills Were Applied

### PreHire & Vibely Experience
- **shadcn UI Integration**: Both projects used shadcn component library for buttons, inputs, cards, and modals
  - Applied to: `Button`, `Input`, `Card` components throughout nua
  - See: `src/components/ui/` directory
- **DaisyUI Theming**: Previous projects leveraged DaisyUI's theme-controller for seamless dark mode
  - Applied to: Header theme toggle in `src/components/Layout/Header.tsx` (line 47)
  - Applied to: Card components using DaisyUI classes like `card`, `card-body`, `badge` in ProductCard
- **Tailwind CSS Expertise**: Complex responsive layouts and component styling
  - Applied to: ProductGrid responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`)
  - Applied to: Form validation error states and conditional styling

---

## Project Structure

\`\`\`
src/
├── api/              # Axios client and API functions
├── components/       # Reusable React components
│   ├── ui/          # shadcn UI components
│   └── Layout/      # Header, Footer, MainLayout
├── pages/           # Page components (routes)
├── routes/          # React Router configuration
├── stores/          # Redux store and slices
├── hooks/           # Custom React hooks (React Query)
├── utils/           # Utility functions and validation
└── assets/          # Static files and images
\`\`\`

---

## Features

- ✅ Product listing with search, category filter, and sorting
- ✅ Product detail page with image gallery and related products carousel
- ✅ Shopping cart with persistent state (localStorage + Redux)
- ✅ Checkout form with validation (react-hook-form + Zod)
- ✅ Order confirmation with order history
- ✅ Responsive design (mobile, tablet, desktop, wide)
- ✅ Dark mode / Light mode toggle
- ✅ Accessible navigation with keyboard support
- ✅ Skeleton loaders and error handling

---

## Testing

### Example: ProductCard Unit Tests

\`\`\`bash
npm test -- ProductCard.test.tsx
\`\`\`

See `src/__tests__/components/ProductCard.test.tsx` for comprehensive examples.

### Example: Cart Slice Reducer Tests

\`\`\`bash
npm test -- cartSlice.test.ts
\`\`\`

See `src/__tests__/stores/cartSlice.test.ts` for Redux reducer testing patterns.

---

## Lighthouse Checklist

### Local Audit

Run a Lighthouse audit locally:

\`\`\`bash
npm run build
npm run preview
# Open DevTools (F12) → Lighthouse → Analyze page load
\`\`\`

### Performance Targets

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

### Key Optimizations

1. Lazy load product images: `loading="lazy"` on `<img>` tags
2. Code splitting: React Router lazy loading for pages
3. Image optimization: Serve WebP with fallback (future enhancement)
4. Minification: Vite handles CSS and JS minification

---

## Deployment to Vercel

### Prerequisites
- GitHub repository (push your code first)
- Vercel account

### Steps

1. **Connect Repository**
   \`\`\`
   Visit https://vercel.com/new
   Import your GitHub repository
   \`\`\`

2. **Configure Build**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables** (if needed)
   \`\`\`
   VITE_API_BASE_URL=https://fakestoreapi.com
   \`\`\`

4. **Deploy**
   - Click "Deploy" to start the build
   - Your app will be live at `https://<project>.vercel.app`

### Automatic Deployments
- Any push to `main` branch triggers automatic deployment
- Preview deployments created for pull requests

---

## Environment Variables

Currently, the app uses the public FakeStore API (`https://fakestoreapi.com`). For future backends:

\`\`\`env
# .env.local (create this file, never commit)
VITE_API_BASE_URL=https://your-api.com
\`\`\`

---

## Git Workflow

See `.github/pull_request_template.md` for PR guidelines.

---

## Changelog

See `CHANGELOG.md` for release history and breaking changes.

---

## License

MIT
