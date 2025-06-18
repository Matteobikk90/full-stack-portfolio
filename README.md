# Full-Stack Portfolio Monorepo

A modern, full-stack portfolio built using a monorepo architecture. It includes a responsive front-end application with animations, routing, form validation, real-time chat and a secure back-end server using Express, Prisma, and authentication via OAuth providers.

---

## 📁 Project Structure

```
full-stack-portfolio/
├── apps/
│   ├── client/         # Frontend app (Vite, React, TailwindCSS)
│   └── server/         # Backend API (Express, Prisma)
├── node_modules/
├── package.json        # Root scripts
├── pnpm-workspace.yaml
└── README.md
```

---

## ✨ Features

### Frontend (`apps/client`)

- Vite + React 19
- TailwindCSS + custom theme system
- Framer Motion & Animated Cursor
- Radix UI components
- Storybook setup for UI
- Vitest + Playwright + Testing Library
- TanStack Router, Forms & Query
- Zod for validation
- Zustand for global state
- Socket.io integration

### Backend (`apps/server`)

- Express 5 API with TypeScript
- Prisma ORM + PostgreSQL
- Passport OAuth with GitHub, Google, LinkedIn, Facebook
- Socket.IO integration
- Zod for request validation
- Sentry integration
- Nodemailer email support

---

## 🧰 Deployment Architecture

- **CI/CD:** GitHub Actions for automatic Docker image builds and pushes
- **Docker:** Separate containers for front-end and back-end apps
- **EC2:** Hosting environment for Docker containers (Amazon Linux)
- **Route 53:** Domain & DNS routing to EC2 public IP or load balancer
- **RDS:** PostgreSQL managed database
- **Certbot:** HTTPS via Let's Encrypt

---

## 🛠️ Tooling

- **Linting:** ESLint with Prettier, Unused Imports, Import Sorting
- **Formatting:** Prettier + Sort Imports
- **Testing:** Vitest, Supertest, Playwright
- **CI/CD:** Husky + Lint-Staged + GitHub Actions

---

## 🛠️ Scripts

### Root

```
pnpm format       # Format all packages
pnpm lint-fix     # Lint and fix all packages
```

### Client

```
pnpm dev              # Start Vite dev server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm test             # Unit tests (Vitest)
pnpm test:e2e         # E2E tests (Playwright)
pnpm storybook        # Start Storybook
```

### Server

```
pnpm dev              # Start dev server with watch
pnpm build            # Build TS with aliases
pnpm start:setup      # Reset DB, seed, and start
pnpm db:r             # Reset DB (Prisma)
pnpm db:g             # Generate Prisma client
pnpm db:p             # Push schema to DB
pnpm db:s             # Run seeder
```

## 👤 Author

**Matteo Soresini**
[https://matteosoresini.com](https://matteosoresini.com)

---

## 📄 License

[MIT](./LICENSE)
