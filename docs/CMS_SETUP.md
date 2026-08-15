# Project CMS setup

## Requirements

- Node.js 20.9 or newer
- PostgreSQL 14 or newer

## Environment

Copy `.env.example` to `.env`, then configure:

```env
DB_HOST=your-postgres-host
DB_PORT=5432
DB_NAME=baolam_website
DB_USER=postgres
DB_PASSWORD=your-database-password
DB_SSL=true
AUTH_SECRET=at-least-32-random-characters
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=base64-encoded-32-byte-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=a-strong-password-with-at-least-12-characters
GCS_BUCKET_NAME=baolam-website-media
GCP_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}
MEDIA_ALLOWED_HOSTS=
```

Generate a suitable auth secret with `openssl rand -base64 32`.

Generate `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` separately with `openssl rand -base64 32`, store it as a stable Railway variable, and do not rotate it on every deployment. Railway's commit SHA is used automatically as Next.js's deployment ID to protect open browser tabs from rolling-deployment version skew.

Use `DB_SSL=true` for Railway's public PostgreSQL endpoint. For a local PostgreSQL server without TLS, use `DB_SSL=false`. `DB_PORT` defaults to `5432` when omitted; the other database variables are required.

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

The first version supports highlights, image with text, gallery, production process, technical solution, and testimonial blocks.

Admins upload images directly in the project editor. The API only creates a five-minute signed POST policy; the browser sends the image directly to GCS, so image bytes do not pass through the Next.js server. JPG, PNG, WebP, and AVIF are accepted up to 10MB per image.

Create a dedicated Google Cloud service account with permission to create objects in this bucket (for example, a bucket-scoped `Storage Object Creator` role), download its key JSON, and paste the complete JSON into `GCP_SERVICE_ACCOUNT_JSON`. Do not wrap it in extra quote characters and do not expose it with a `NEXT_PUBLIC_` prefix.

The bucket must allow browser POST requests from the admin origins. Apply a CORS configuration equivalent to:

```json
[
  {
    "origin": ["https://noithatbaolam.com", "http://localhost:3001"],
    "method": ["POST"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
```

With gcloud, save that JSON as `cors.json` and run `gcloud storage buckets update gs://YOUR_BUCKET --cors-file=cors.json`.

Image URLs are restricted to HTTPS URLs from `storage.googleapis.com` and the configured `GCS_BUCKET_NAME`. `images.unsplash.com` remains allowed for the bundled demo data. Add custom CDN hostnames to the comma-separated `MEDIA_ALLOWED_HOSTS` variable before building and deploying.

## Production

Run `npm run db:migrate` as a release step before starting the new application version. Do not run `drizzle-kit push` against production.
