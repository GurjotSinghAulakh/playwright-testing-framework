# Playwright Testing Framework (API + E2E)

A production-ready, modular Playwright + TypeScript monorepo for API and E2E testing. Designed for scale, clarity, and reliable CI execution with pnpm workspaces.

## Highlights
- Monorepo with `apps/` for runnable suites and `packages/` for shared building blocks
- Two suites out of the box: API tests and E2E tests
- Shared config, fixtures, utilities, and API client
- CI-ready GitHub Actions pipeline with Playwright artifacts
- Works immediately after clone (no secrets required)

## Table of Contents
- [Repository Layout](#repository-layout)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Workspace Commands](#workspace-commands)
- [Environment Configuration](#environment-configuration)
- [Writing Tests](#writing-tests)
- [Shared Packages](#shared-packages)
- [Reports and Artifacts](#reports-and-artifacts)
- [CI](#ci)
- [Docs](#docs)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Repository Layout
```txt
playwright-testing-framework/
├─ apps/
│  ├─ api-tests/
│  │  ├─ tests/
│  │  ├─ playwright.config.ts
│  │  └─ README.md
│  └─ e2e-tests/
│     ├─ tests/
│     ├─ playwright.config.ts
│     └─ README.md
├─ packages/
│  ├─ api-client/
│  ├─ config/
│  ├─ fixtures/
│  └─ utils/
├─ docs/
│  └─ getting-started.md
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ .env.example
├─ package.json
├─ pnpm-workspace.yaml
└─ tsconfig.base.json
```

## Prerequisites
- Node.js 20+
- pnpm (via Corepack)

## Quick Start
```bash
corepack enable
pnpm install
pnpm exec playwright install --with-deps
pnpm test:api
pnpm test:e2e
```

## Workspace Commands
From repo root:
- `pnpm test:api` — run API suite (`apps/api-tests`)
- `pnpm test:e2e` — run E2E suite (`apps/e2e-tests`)
- `pnpm typecheck` — typecheck all apps + packages
- `pnpm lint` — lint all apps + packages
- `pnpm format` / `pnpm format:fix` — Prettier checks

Run directly in an app:
```bash
pnpm -C apps/api-tests test
pnpm -C apps/e2e-tests test
```

## Environment Configuration
Defaults are provided so the repo works without secrets.

- `.env.example` is committed
- `.env*` files are ignored
- Supported values (see `packages/config`):
  - `ENV_NAME` (default: `local`)
  - `BASE_URL` (default: `https://example.com`)
  - `API_BASE_URL` (default: `https://jsonplaceholder.typicode.com`)

## Writing Tests
General guidelines:
- Keep tests small and readable
- Prefer shared fixtures and helpers over repeated setup
- Use role-based locators in E2E tests
- Validate API responses for status and essential fields

API tests:
- Use the shared `api` fixture from `packages/fixtures`
- Example target: `https://jsonplaceholder.typicode.com/posts/1`

E2E tests:
- Use the shared `test` fixture from `packages/fixtures`
- Example target: `https://example.com`

## Shared Packages
- `@repo/config`: environment defaults and helpers
- `@repo/fixtures`: Playwright fixtures (API request context + base URLs)
- `@repo/api-client`: lightweight typed API client wrapper
- `@repo/utils`: small reusable utilities (logger)

## Reports and Artifacts
Playwright generates:
- HTML report: `playwright-report/`
- Raw results: `test-results/`

Both are uploaded in CI and ignored by git.

## CI
GitHub Actions workflow: `.github/workflows/ci.yml`

CI runs:
1. Install dependencies
2. Install Playwright browsers
3. Typecheck
4. API tests
5. E2E tests

Artifacts:
- `playwright-report`
- `test-results`

## Docs
- `docs/getting-started.md`
- `apps/api-tests/README.md`
- `apps/e2e-tests/README.md`

## Contributing
See `CONTRIBUTING.md` for guidelines on reporting issues, proposing changes, and submitting pull requests.

## Security
Please review `SECURITY.md` for responsible disclosure guidance.

## License
MIT — see `LICENSE`.
