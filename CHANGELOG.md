# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-19

### Added
- Initial project setup with Vite + React 19 + TypeScript
- Product listing page with search, category filter, and sorting
- Product detail page with image gallery and related products
- Shopping cart with Redux Toolkit state management
- Checkout form with react-hook-form and Zod validation
- Order confirmation page
- Responsive layout with dark/light mode toggle
- Integration with FakeStore API via Axios and React Query
- localStorage persistence for cart and orders
- Accessibility features: ARIA labels, keyboard navigation
- Skeleton loaders and error handling

### Features
- Multi-breakpoint responsive grid (mobile/tablet/desktop/wide)
- 10-minute product cache with React Query
- localStorage hydration for offline support
- Theme toggle using DaisyUI
- Debounced search (300ms)
- Quantity selector (1-10 for cart, 1-5 for product add)

### Performance
- Lazy loading for product images
- Code splitting ready for React Router
- Lighthouse targeting: 90+ Performance, 95+ Accessibility

### Accessibility
- Full keyboard navigation
- ARIA labels on all interactive elements
- Semantic HTML structure
- Color contrast compliance

---

## [Unreleased]

### Planned
- Image optimization (WebP with fallback)
- Order history page
- Product reviews and ratings
- Wishlist feature
- Payment gateway integration (Stripe)
- User authentication
