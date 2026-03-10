# Railway Deployment Guide

This guide outlines the steps to deploy the Ramadhan Challenge 2026 application to [Railway.app](https://railway.app).

This project requires a **PostgreSQL Database** and a **Web Service** to run the Next.js application.

## Prerequisites

- A GitHub account with access to the repository (`krackeddevs/ramadhan-challenge26`).
- A Railway account (linked to your GitHub).
- Cloudinary credentials (from your existing `.env`).

---

## 1. Create a New Project & Database

1. Go to your [Railway Dashboard](https://railway.app/dashboard).
2. Click **New Project**.
3. Select **Provision PostgreSQL**.
4. Railway will spin up a fresh PostgreSQL database. Once it's ready, click on the **Postgres** service.
5. Go to the **Variables** tab of the Postgres service. You will need the `DATABASE_URL` later.

## 2. Deploy the Web Service

1. In the same Railway project dashboard, click **+ New** (top right) or **+ Create** -> **GitHub Repo**.
2. Search for and select the `krackeddevs/ramadhan-challenge26` repository.
3. If prompted, click **Add Variables** (or skip and we will configure them in the next step).
4. Do **not** deploy just yet if it asks you, as it will crash without the environment variables. Wait for the service to appear in your canvas.

## 3. Set Environment Variables

Click on the newly created **Web Service** in your Railway canvas, go to the **Variables** tab, and add the following required environment variables:

| Variable Name | Description / Value |
| :--- | :--- |
| `DATABASE_URL` | Add a **Reference Variable** to the Postgres database provided by Railway (type `${{Postgres.DATABASE_URL}}` or select it from the dropdown). |
| `ADMIN_EMAIL` | The admin email to seed the database and login (e.g., `admin@krackeddevs.com`). |
| `ADMIN_PASSWORD` | The admin password to seed the database and login. |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary Cloud Name. |
| `CLOUDINARY_API_KEY` | Your Cloudinary API Key. |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API Secret. |
| `AUTH_SECRET` | A secure, random string for NextAuth. You can generate one with `openssl rand -base64 32`. |
| `AUTH_URL` | Your public Railway URL once generated (e.g., `https://ramadhan26-production.up.railway.app`). Only required if authentication redirects fail. |

## 4. Configure Build Settings

Railway uses [Nixpacks](https://nixpacks.com/) by default. We have configured `package.json` to enforce `Node.js >=20.9.0` which Nixpacks explicitly reads.

Ensure the build and deploy commands are set correctly. Click on your **Web Service** -> **Settings** tab. Scroll down to **Build** and **Deploy**:

- **Build Command:** `npm run build` (This runs `npx prisma generate && next build` as defined in `package.json`).
- **Start Command:** `npm run start`

*(Note: We also have a `Dockerfile` in the repo. If Railway detects the Dockerfile and attempts to build using Docker, it should work fine, but Nixpacks is generally faster for Next.js).*

## 5. Generate a Public Domain

1. In the **Web Service**, go to the **Settings** tab.
2. Under **Networking**, click **Generate Domain** (or set up a custom domain).
3. Copy this URL. If you have authentication issues, set this URL as your `AUTH_URL` in the **Variables** tab.

## 6. Seed the Database

Before you log in to the admin dashboard, you need to sync the Prisma schema and optionally seed the temporary submissions.

1. Open your terminal natively (on your Mac) and push the schema to the remote database:

   ```bash
   # Make sure you set your local DATABASE_URL temporarily to the Railway PostgreSQL URL
   # or run this directly through the Railway Service Terminal
   ```

**Alternatively, the easiest way (via Railway CLI / Terminal):**

1. Click on your **Web Service** -> **Terminal** tab.
2. Run the database migration:

   ```bash
   npx prisma db push
   ```

3. Run the database seed (creates the admin user and fetches the 13 Cloudinary seeded apps):

   ```bash
   npx prisma db seed
   ```

## 7. You're Live

Your application is now successfully deployed!

- Access the homepage at your generated domain to see the 3D cinematic MapLibre intro.
- Access `/admin/login` to log into your dashboard using your seeded `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
