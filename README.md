# Playwright Testing Framework (API + E2E)

A **scalable, modular, and maintainable Playwright testing framework** for **API testing** and **end-to-end (E2E) testing**, built for modern systems (microservices, multi-env deployments, CI pipelines) and designed for open-source collaboration.

This repository provides:
- A clean **monorepo architecture** (apps + shared packages)
- Opinionated but flexible **best practices**
- A foundation you can use as a template for real production test automation

## Table of Contents

- [Goals](#goals)
- [Non-Goals](#non-goals)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment & Configuration](#environment--configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
  - [API Testing Approach](#api-testing-approach)
  - [E2E Testing Approach](#e2e-testing-approach)
- [Test Data Strategy](#test-data-strategy)
- [Reporting](#reporting)
- [CI/CD](#cicd)
- [Coding Standards](#coding-standards)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Roadmap](#roadmap)
- [FAQ](#faq)

## Goals

- **Modular & scalable**: easy to add new test suites, services, and workflows without turning the repo into spaghetti.
- **Maintainable**: promote reuse via shared packages (fixtures, config, api clients, utilities).
- **CI-ready**: runs reliably in GitHub Actions (or any CI) with deterministic execution and clear reporting.
- **Beginner-friendly**: documented setup and conventions, plus clear folder boundaries.
- **Open-source ready**: includes contributor guidance, security policy, and clean project hygiene.
  
## Non-Goals

- This is **not** a “one size fits all” framework for every company’s internal needs.
- This repo does **not** include proprietary integrations (Vault, internal auth providers, etc.).
- This repo does **not** aim to replace contract testing tools (e.g., Pact). It complements them.

## Key Features

- ✅ Playwright + TypeScript
- ✅ **API testing** using Playwright `request` context
- ✅ **E2E testing** for critical user journeys
- ✅ Monorepo with shared, reusable packages
- ✅ Standardized fixtures and configuration across suites
- ✅ Environment-based runs (local / staging / prod-friendly)
- ✅ CI-friendly commands and reporting hooks
- ✅ Open-source hygiene: contributing + security + license


## Architecture

This project uses a **monorepo** to keep a clean separation between:
- **apps/** → runnable test suites (API tests, E2E tests, future suites)
- **packages/** → reusable framework modules shared across apps

### Why monorepo?
- Avoid duplicated logic between API and E2E suites
- Centralize auth, config, clients, helpers
- Keep test suites independent while sharing core building blocks

### Typical flow
- `apps/api-tests` uses shared `packages/api-client` + `packages/fixtures`
- `apps/e2e-tests` uses shared `packages/fixtures` + `packages/utils`
- Both depend on shared `packages/config` for environment + Playwright defaults

## Repository Structure

```txt
playwright-testing-framework/
├─ apps/
│  ├─ api-tests/
│  │  ├─ tests/
│  │  ├─ playwright.config.ts
│  │  └─ README.md
│  └─ e2e-tests/
│     ├─ tests/
│     ├─ pages/                # optional: Page Objects where beneficial
│     ├─ playwright.config.ts
│     └─ README.md
│
├─ packages/
│  ├─ config/                  # shared configuration (timeouts, env parsing)
│  ├─ fixtures/                # shared Playwright fixtures (auth, context)
│  ├─ api-client/              # typed API clients + request helpers
│  ├─ utils/                   # shared utils (logger, waiters, assertions)
│  └─ test-data/               # optional: shared data builders/factories
│
├─ docs/
│  ├─ getting-started.md
│  ├─ architecture.md
│  ├─ writing-tests.md
│  └─ ci.md
│
├─ .github/
│  ├─ workflows/
│  │  ├─ ci.yml
│  │  └─ nightly.yml
│  ├─ ISSUE_TEMPLATE/
│  └─ PULL_REQUEST_TEMPLATE.md
│
├─ README.md
├─ CONTRIBUTING.md
├─ SECURITY.md
├─ CODE_OF_CONDUCT.md
├─ LICENSE
├─ .gitignore
├─ .editorconfig
├─ package.json
├─ pnpm-workspace.yaml
└─ tsconfig.base.json
```

## Tech Stack

- **Node.js:** 18+ (recommended 20+)
- **TypeScript**
- **Playwright**
- **pnpm workspaces** (recommended for monorepos)

## Optional (recommended):

- **ESLint + Prettier**
- **dotenv / env schema validation**
- **GitHub Actions CI**

# Getting Started

## Prerequisites

- Node.js 18+ (recommended: Node 20)
- pnpm (recommended)
- Git

## Enable pnpm via corepack:

```bash
dcorepack enable
dcorepack prepare pnpm@latest --activate
```

## Clone & install

```bash
git clone https://github.com/<your-username>/playwright-testing-framework.git
cd playwright-testing-framework
pnpm install
pnpm exec playwright install
```

# Environment & Configuration

## Environment variables

This framework supports `.env` files per environment. Recommended convention:

- `.env.example` (committed)
- `.env.local` (ignored)
- `.env.staging` (ignored)
- `.env.prod` (ignored)

### Example `.env.example`

```
BASE_URL=https://example.com
API_BASE_URL=https://api.example.com
AUTH_USERNAME=your-user
AUTH_PASSWORD=your-password
ENV_NAME=local
```

**Never commit secrets. Store real secrets in CI secret storage** (`GitHub Actions Secrets`, etc.).

## Configuration layering

Recommended order of configuration priority:
1. CLI args
2. Environment variables
3. Defaults in `packages/config`

This ensures local developer experience stays simple, while CI stays explicit and reproducible.

# Running Tests

## Root scripts (recommended)
From the repository root:
- `pnpm test:api`
- `pnpm test:e2e`

## Run a specific app directly
directly:
- `pnpm -C apps/api-tests test`
- `pnpm -C apps/e2e-tests test`

## Debug mode (Playwright)
`PWDEBUG=1 pnpm test:e2e`

## Headed mode (E2E)
`pnpm -C apps/e2e-tests test --headed`

# Writing Tests

## Principles
- Tests should be **deterministic**
- Tests should be **isolated**
- Keep test cases **small and readable**
- Move reusable logic into shared packages/*

## API Testing Approach
API tests should validate:
- Status codes
- Response schema/shape
- Business rules and edge cases
- Authorization rules (when relevant)
- Contract behavior (without turning into UI testing)

Recommended structure:
- `packages/api-client`: typed clients (e.g., `UsersClient`, `OrdersClient`)
- `packages/fixtures`: `api` fixture that exposes preconfigured request context
- `apps/api-tests/tests`: concise test cases

Example pattern (high-level):
- Arrange: create preconditions via API
- Act: call endpoint under test
- Assert: validate response + side effects
- Cleanup: cleanup test data when needed

## E2E Testing Approach

E2E tests should focus on:
- Critical user journeys
- High confidence, low redundancy
- A small set of stable flows (smoke/regression tiers)

Recommended:
- Use Page Objects only where they improve readability and reuse
- Prefer API setup for test data creation to reduce UI flakiness
- Avoid brittle selectors (prefer `getByRole`, `getByTestId`)

## Test Data Strategy

Recommended tiers
- **Static test accounts** for smoke tests (stable, non-destructive)
- **Generated test data** for deeper suites (create via API, cleanup afterwards)
- **Factories/builders** in `packages/test-data` (optional)

Guidelines:
- Never reuse data that causes flaky dependencies between tests
- Always aim for tests that can run in parallel without collisions
- Prefer server-side cleanup hooks if possible

## Reporting

Playwright includes excellent built-in reporting (HTML report, traces, screenshots).
Recommended defaults:
- Enable trace on retry
- Capture screenshot on failure
- Save videos for E2E failures (optional)

In CI:
- Upload Playwright HTML report as an artifact
- Upload traces for debugging failures

## CI/CD

Recommended pipeline behavior:
- Pull Requests:
  - Lint + typecheck
  - API tests (fast, stable)
  - Optional: E2E smoke suite only

- Nightly:
  - Full E2E regression
  - Full API suite
  - Store artifacts (report + traces)

The `.github/workflows` folder should include:
- `ci.yml` for PR/merge validation
- `nightly.yml` for scheduled runs

## Coding Standards

Recommended:
- TypeScript strict mode
- ESLint + Prettier
- Consistent naming conventions:
  - `*.spec.ts` for tests
  - `client.ts` for API clients
  - `fixtures.ts` for Playwright fixtures
- Prefer explicitness over clever abstractions

## Contributing

Contributions are welcome 🎉

Ways to contribute:
- Documentation improvements
- Bug fixes
- More examples or utilities
- CI improvements
- Framework enhancements (fixtures, reporting, test data)

Please read [Contributing Guide](CONTRIBUTING.md) before submitting a PR.
We recommend:
- Small PRs
- Clear commit messages
- Tests or examples when adding new features

## Security

If you discover a security issue:
- Do **not** open a public issue with sensitive details.
- Follow [Security Policy](SECURITY.md) to report responsibly.

License

This project is licensed under the **MIT License**.
You can use, modify, and distribute it freely (including commercial usage).

## FAQ
**Why separate API and E2E into different apps?**

It keeps configs, dependencies, and execution patterns clean:
- API tests run fast, often, in PRs
- E2E tests can be heavier, run on merge/nightly

**Can I use this in a separate repository that only contains tests?**
Yes. The structure is designed so apps/* can be extracted into a standalone test repository if desired.

**Why Playwright for API testing?**
Playwright’s request context is stable, CI-friendly, and integrates well with its reporting and test runner.

Happy testing 🚀


























