# div-mini-project

A focused Next.js application with a project-local Material UI design, Zod validation,
Prisma ORM with MySQL, and Better Auth email/password authentication.

## Included routes

- `/` — login page
- `/dashboard` — authenticated landing page
- `/api/auth/[...all]` — Better Auth route handler

## Local setup

1. Copy `.env.example` to `.env` and replace every placeholder.
2. Create the MySQL database named by `DATABASE_URL`.
3. Generate the Prisma client:

   ```bash
   npm run db:generate
   ```

4. Create and apply the initial migration:

   ```bash
   npm run db:migrate -- --name init
   ```

5. Start the application:

   ```bash
   npm run dev
   ```

The project intentionally contains a login UI only. Before login can succeed, create a
user through an approved provisioning flow or Better Auth's email sign-up endpoint. Do
not insert plaintext passwords directly into the database; Better Auth stores credential
password hashes in the `account` table.

## Environment variables

- `DATABASE_URL` — a `mysql://` connection URL
- `BETTER_AUTH_SECRET` — a cryptographically random secret with at least 32 characters
- `BETTER_AUTH_URL` — the application's public origin, such as `http://localhost:3000`

## Useful commands

```bash
npm run lint
npm run build
npm run db:generate
npm run db:migrate
npm run db:studio
```
