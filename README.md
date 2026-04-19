
# DVLD (Drivers & Vehicles License Department)

DVLD is a desktop-first license management system built with Electron + React on the client, a Node/Express + TypeORM API server, and a shared TypeScript DTO/types package. It supports core DVLD workflows such as people, drivers, licenses, applications, tests, and detained licenses.

## Monorepo Structure

```bash
packages/
    client/   # Electron + React (Vite)
    server/   # Express + TypeORM API
    shared/   # Shared DTOs/types
```

## Tech Stack

- **Client:** React 18, Vite, Electron
- **Server:** Node.js, Express, TypeORM, PostgreSQL
- **Shared:** TypeScript DTOs/types used by client & server

## Prerequisites

- Node.js (recommended: latest LTS)
- npm
- PostgreSQL

## Environment Variables (Server)

Create a `.env` file in `packages/server`:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=dvld
PORT=3000
SESSION_SECRET=your_session_secret
NODE_ENV='development' | 'production'
CORS_ORIGIN='http://localhost:5173'
```

The server uses `typeorm` with `synchronize: true` (in development mode), so it will auto-create tables on startup.

## Install Dependencies

Run this command in the top-level:

```bash
npm ci
```

## Import Backup Database

From the repository root, create the database (if missing), then import `backup.sql`:

```bash
npm run db:create
```

```bash
psql -d dvld -f backup.sql
```

## Development

From the repository root, you can use the top-level workspace scripts:

```bash
npm run dev:server
npm run dev:client
```

Equivalent package-level commands:

Start the server (API):

```bash
cd packages/server
npm run start:dev
```

Start the client (Electron + Vite):

```bash
cd packages/client
npm run start:dev
```

Default ports:

- Client (Vite): `http://localhost:5173`
- Server (API): `http://localhost:3000`

## Build

From the repository root:

```bash
npm run build
```

This runs `build:shared` and then compiles the referenced TypeScript projects.

Other top-level build scripts:

```bash
npm run build:shared
npm run build:server
npm run build:client
npm run dist:client
```

The client build also runs `electron-builder` to package the desktop app (using `npm run dist:client`).

## Docker

### Running with Docker Compose

The project includes a multi-stage Dockerfile and docker-compose configuration for containerized deployment.

**Prerequisites:**

- Docker
- Docker Compose

**Start the application:**

```bash
docker compose up
```

This will:

- Build the application image
- Start a PostgreSQL database container
- Import backup.sql into the PostgresSQL container (populate the db)
- Start the DVLD server container
- Expose the server on `http://localhost:3000`

**Environment variables (docker-compose.yml):**

Default PostgreSQL credentials:

- `POSTGRES_USER=myuser`
- `POSTGRES_PASSWORD=mypassword`
- `POSTGRES_DB=dvld_db`

You can override these in the `docker-compose.yml` file or use a `.env` file, make sure you match the `.env.docker` with it:

```bash
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
```

**Stop the application:**

```bash
docker compose down
```

## Top-Level Scripts (Root package.json)

- `npm run dev:server` - Run server in development mode (`@dvld/server`)
- `npm run dev:client` - Run client in development mode (`@dvld/client`)
- `npm run build` - Build shared package, then run TypeScript project build
- `npm run build:shared` - Build `@dvld/shared`
- `npm run build:client` - Build `@dvld/client`
- `npm run build:server` - Build `@dvld/server`
- `npm run run:server` - Run server in production mode (`@dvld/server`)
- `npm run dist:client` - Create client distribution package (`@dvld/client`)
- `npm run clean` - Clean TypeScript build outputs (`tsc -b --clean`)
- `npm run db:create` - Create PostgreSQL `dvld` database if it does not exist
- `npm run lint` - Run client lint checks (`@dvld/client`)

## API Routing (Server)

The API is organized by feature under `packages/server/src/routes` and mounted in `packages/server/src/routes.ts`:

- `/person`
- `/user`
- `/driver`
- `/country`
- `/applicationType`
- `/testType`
- `/licenseClass`
- `/license`
- `/internationalLicense`
- `/application`
- `/testAppointment`
- `/test`
- `/login`, `/logout`
- `/me`

## Notes

- File uploads are served from `/uploads` in the server.
- DTOs and shared types are defined in `packages/shared`.
