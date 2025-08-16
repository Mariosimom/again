# Dubai Elite CMS (Next.js 14 + Prisma + NextAuth + Tailwind)

## Quick Start (Local)
1. Copy `.env.example` to `.env` and fill `DATABASE_URL` (Neon/Supabase Postgres), `NEXTAUTH_SECRET`.
2. Install deps:
   ```bash
   npm i
   npm run db:push
   npm run db:seed
   npm run dev
   ```
3. Admin login: **admin@dubaielite.com / admin123** → http://localhost:3000/admin

## Deploy on Vercel
1. Create a new Vercel project from this folder.
2. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - (Optional Cloudinary keys for uploads)
3. In **Deploy Hooks / Build & Output Settings** leave defaults. After first deploy, run:
   - `npx prisma db push` (Vercel Postgres or external DB)
   - (Optional) `npm run db:seed` locally against prod DB to add admin + sample blocks.
4. Visit `/admin` to access the dashboard.

## Features Included
- Secure admin area with login (NextAuth Credentials)
- **Block Builder** with drag-and-drop ordering and publish toggle
- CRUD for **Listings** and **Projects**
- Public homepage renders blocks dynamically (SSR)
- Tailwind design system (cards/buttons/inputs)
- Prisma data model for: User, Listing, Project, Area, Agent, Stat, Testimonial, Block (+ enums)

## Next Steps
- Add Area/Agent/Testimonial CRUD pages similarly to Listings/Projects.
- Connect Cloudinary uploads (direct unsigned upload with preset) and store URLs in DB.
- Add scheduling UI (scheduleStart/scheduleEnd) to blocks.
- Create /listings/[id] & /projects/[id] pages with SEO metadata.
- Add EN/RU translation toggler and contact/WhatsApp components from your static site.
