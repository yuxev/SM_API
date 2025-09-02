<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# UM API — File-based User Management (NestJS)

A small learning project built with NestJS that implements full CRUD for users using file-based persistence (no database). It's designed to teach DTOs, validation pipes, and Node.js file I/O by storing user records in a JSON file (`users.json`).

## Project goals

- Learn NestJS fundamentals: controllers, services, modules, DTOs, and validation pipes.
- Practice reading and writing JSON files from Node.js for simple persistence.
- Implement safe-ish file-based CRUD (create, read, update, delete) for user records.

## Features

- Create users with validated input (`name`, `email`, `password`).
- Read all users or a single user by ID.
- Update users with partial DTOs (PATCH semantics).
- Delete users and persist the change to `users.json`.
- Lightweight, dependency-minimal API suitable for learning and experimentation.

## Tech stack

- Node.js
- NestJS
- TypeScript
- (Optional) Jest for tests (project includes `test/` folder and e2e config)

## Where data lives

All user records are stored in a JSON file named `users.json` located in the project root (next to `package.json`) or created at runtime if missing. The file shape is an array of user objects, for example:

```json
[
  {
    "id": "uuid-or-id",
    "name": "Alice",
    "email": "alice@example.com",
    "password": "hashed-or-plain"
  }
]
```

Note: This project is intended for learning. Do NOT store plaintext passwords in production. Consider hashing before persisting when you extend this project.

## Quick start

Prerequisites:
- Node.js (v16+ recommended)
- npm

Install dependencies and run in dev mode:

```bash
cd um_api
npm install
npm run start:dev
```

By default Nest runs on `http://localhost:3000` unless configured otherwise.

## Available npm scripts

Check `package.json` for the exact scripts, but typical useful scripts are:

```bash
npm run start     # start production build
npm run start:dev # start in watch mode (development)
npm run build     # compile TypeScript to JavaScript
npm run test:e2e  # run e2e tests (if configured)
```

## HTTP API

Base URL: `http://localhost:3000` (adjust if your env differs)

Endpoints (conventional paths — confirm in `src/app.controller.ts`):

- POST /users
  - Create a new user
  - Body (JSON): `{ "name": string, "email": string, "password": string }`
  - Validations: name and email required; email format validated; password requirements depend on DTO implementation

- GET /users
  - Return an array of users (reads `users.json`)

- GET /users/:id
  - Return a single user by ID

- PATCH /users/:id
  - Apply a partial update to a user (only provided fields updated)
  - Body: partial user fields (e.g. `{ "name": "new" }`)

- DELETE /users/:id
  - Remove a user by ID and update `users.json`

Example curl to create a user:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret"}'
```

Example curl to list all users:

```bash
curl http://localhost:3000/users
```

## DTOs & Validation

This project uses DTOs and NestJS validation pipes to validate incoming data. Typical DTOs you'll find or implement:

- `CreateUserDto` — required fields for creating a user
- `UpdateUserDto` — a `PartialType(CreateUserDto)` for PATCH updates

Validation is handled via class-validator decorators (e.g. `@IsString()`, `@IsEmail()`, `@IsNotEmpty()`), and you can enable global validation pipes in `main.ts`.

## File I/O notes & safety

- Reads load `users.json` and returns parsed JSON.
- Writes replace the file contents with serialized JSON representing the current user array.
- For small learning projects this is OK, but watch out for race conditions in concurrent environments. Consider:
  - Using atomic write strategies (write to a temp file then rename)
  - File locking or mutex when multiple processes may write
  - Moving to a proper database for concurrent, large-scale, or secure needs

## Security notes

- This implementation is for learning. Do not use in production without strengthening security.
- Hash passwords before persisting (e.g., bcrypt) — do not store plaintext passwords.
- Add authentication (JWT or sessions) and authorization checks for protected routes.

## Testing

The repository includes a `test/` folder. To run tests, inspect `package.json` for the test scripts. Example:

```bash
npm run test
npm run test:e2e
```

Adjust commands to match the scripts present in this repo.

## Next steps / suggested improvements

- Hash passwords (bcrypt) before saving.
- Add request authentication and role-based authorization.
- Add per-request input sanitization and stronger validators.
- Replace file storage with a database (Postgres + Prisma) as you progress.
- Add logging and better error handling for file read/write failures.

## Contributing

This is a personal learning project. If you want to extend it, open a branch and create small, focused changes. Add tests for new behaviors.

## License

MIT

---

Requirements coverage:
- Create, read, update, delete users using `users.json`: Documented
- Validated input via DTOs and validation pipes: Documented
- File I/O read/write operations explained and safety notes: Documented
- Learning-focused guidance for migrating to DB and next steps: Documented

If you'd like, I can also add a sample `users.json` starter file, or implement example DTOs/controllers in `src/` and run the project to verify behavior. What would you like next?
