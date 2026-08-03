# GreenStock

A full-stack plant inventory management application built with Next.js, TypeScript, and Prisma.

## Features

### Plant Management

- Add, edit, and delete plants
- Organize plants by category (Indoor, Outdoor, Succulent, Flowering, Herb, Fern, Tree, Shrub)
- Track stock levels and pricing
- Upload plant images via UploadThing

### Search & Filter

- Search plants by name
- Filter by category
- Combine search and category filters

### Authentication & Authorization

- Authentication via Stack Auth
- Each user only sees and can modify their own plants (ownership is enforced server-side on every read/write, not just in the UI)

### UI

- Built with shadcn/ui and Tailwind CSS
- Dark/light theme support via next-themes
- Skeleton loading states

## Tech Stack

### Frontend

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui + Radix UI primitives
- TanStack React Query - client-side data fetching/caching, wired to server actions
- React Hook Form + Zod - form state and validation, shared schema between client and server
- React Hot Toast - notifications

### Backend

- Next.js Server Actions
- Prisma ORM
- PostgreSQL (via Neon)
- Stack Auth - authentication and session management
- UploadThing - file uploads

### Tooling

- pnpm - package manager
- ESLint (flat config, `eslint-config-next`)
- Prisma CLI
