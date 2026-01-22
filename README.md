# Playwright Testing Framework (API + E2E)

A **scalable, modular, and maintainable Playwright testing framework** for **API testing** and **end-to-end (E2E) testing**, built for modern systems (microservices, multi-env deployments, CI pipelines) and designed for open-source collaboration.

This repository provides:
- A clean **monorepo architecture** (apps + shared packages)
- Opinionated but flexible **best practices**
- A foundation you can use as a template for real production test automation

---

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

---

## Goals

- **Modular & scalable**: easy to add new test suites, services, and workflows without turning the repo into spaghetti.
- **Maintainable**: promote reuse via shared packages (fixtures, config, api clients, utilities).
- **CI-ready**: runs reliably in GitHub Actions (or any CI) with deterministic execution and clear reporting.
- **Beginner-friendly**: documented setup and conventions, plus clear folder boundaries.
- **Open-source ready**: includes contributor guidance, security policy, and clean project hygiene.

---

## Non-Goals

- This is **not** a “one size fits all” framework for every company’s internal needs.
- This repo does **not** include proprietary integrations (Vault, internal auth providers, etc.).
- This repo does **not** aim to replace contract testing tools (e.g., Pact). It complements them.

---

## Key Features

- ✅ Playwright + TypeScript
- ✅ **API testing** using Playwright `request` context
- ✅ **E2E testing** for critical user journeys
- ✅ Monorepo with shared, reusable packages
- ✅ Standardized fixtures and configuration across suites
- ✅ Environment-based runs (local / staging / prod-friendly)
- ✅ CI-friendly commands and reporting hooks
- ✅ Open-source hygiene: contributing + security + license

---

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

---

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


## Tech Stack

- **Node.js:** 18+ (recommended 20+)
- **TypeScript**
- **Playwright**
- **pnpm workspaces** (recommended for monorepos)

## Optional (recommended):

- **ESLint + Prettier**
- **dotenv / env schema validation**
- **GitHub Actions CI**
