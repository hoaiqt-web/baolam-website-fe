# Project CMS setup

## Requirements

- Node.js 20.9 or newer
- PostgreSQL 14 or newer

## Environment

Copy `.env.example` to `.env`, then configure:

```env
DATABASE_URL=postgresql://...
AUTH_SECRET=at-least-32-random-characters
ADMIN_USERNAME=admin
ADMIN_PASSWORD=a-strong-password-with-at-least-12-characters
GCS_BUCKET_NAME=baolam-website-media
MEDIA_ALLOWED_HOSTS=
```

Generate a suitable auth secret with `openssl rand -base64 32`.

## Initialize the database

```bash
npm run db:migrate
npm run db:seed-admin
npm run db:seed-projects
```

`db:seed-projects` is optional. It imports the current hard-coded homepage projects so their detail links work immediately.

## Use the CMS

Run `npm run dev` and open:

- Admin: `http://localhost:3001/admin`
- Public detail: `http://localhost:3001/projects/<slug>`
- Authenticated preview: `http://localhost:3001/preview/projects/<project-id>`

Only published projects are visible publicly. Draft and archived projects remain available in admin.

After saving a new project, use **Xem trước** from the edit page. Preview requires an active admin session, is never cached, and sends `noindex`, `nofollow`, and `nocache` metadata. It uses the same `ProjectDetailView` component as the public route.

Project detail pages are generated on demand, cached for up to one hour, and invalidated immediately whenever an admin saves, renames, publishes, archives, or deletes a project. The public query always filters by `published` status.

## Content blocks

The first version supports highlights, image with text, gallery, production process, technical solution, and testimonial blocks. Images are entered as URLs. Object storage upload can be added later without changing the project or block schema.

Image URLs are restricted to HTTPS URLs from `storage.googleapis.com` and the configured `GCS_BUCKET_NAME`. `images.unsplash.com` remains allowed for the bundled demo data. Add custom CDN hostnames to the comma-separated `MEDIA_ALLOWED_HOSTS` variable before building and deploying.

## Production

Run `npm run db:migrate` as a release step before starting the new application version. Do not run `drizzle-kit push` against production.
