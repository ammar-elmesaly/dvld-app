
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
SESSION_SECRET=your_session_secret
```

The server uses `typeorm` with `synchronize: true`, so it will auto-create tables on startup.

## Install Dependencies

Run these in each package:

```bash
cd packages/shared
npm install

cd ../server
npm install

cd ../client
npm install
```

## Development

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

Build the shared package first, then server and client:

```bash
cd packages/shared
npm run build

cd ../server
npm run build

cd ../client
npm run build
```

The client build also runs `electron-builder` to package the desktop app.

## Useful Scripts

### Client (`packages/client`)

- `npm run start:dev` — Vite dev server (Electron renderer)
- `npm run build` — Build + package Electron app
- `npm run preview` — Preview Vite build

### Server (`packages/server`)

- `npm run start:dev` — Nodemon + TS
- `npm run build` — Compile TypeScript
- `npm run start` — Run compiled server

### Shared (`packages/shared`)

- `npm run build` — Compile TypeScript DTOs/types

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
