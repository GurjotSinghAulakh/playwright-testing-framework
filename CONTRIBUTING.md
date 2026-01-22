# Contributing Guide

Thanks for your interest in contributing! 🎉  
This project aims to be a scalable, modular Playwright testing framework for API + E2E testing. Contributions that improve maintainability, clarity, and real-world usability are especially welcome.

## Table of Contents
- [Ways to Contribute](#ways-to-contribute)
- [Project Principles](#project-principles)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style & Standards](#code-style--standards)
- [Writing Tests](#writing-tests)
- [Commit Messages](#commit-messages)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Reporting Bugs / Requesting Features](#reporting-bugs--requesting-features)
- [Community Standards](#community-standards)

## Ways to Contribute
You can contribute by:
- Fixing bugs
- Adding features (fixtures, utils, API client abstractions, reporting improvements)
- Improving documentation (`docs/`, README, examples)
- Adding example tests or best-practice templates
- Improving CI workflows or developer experience

## Project Principles
Please keep these principles in mind:
- **Test code is production code**: prioritize clarity and maintainability.
- **Small, focused changes**: PRs should be easy to review.
- **Deterministic testing**: avoid flaky or environment-dependent tests.
- **Modular design**: reusable logic belongs in `packages/*`, test cases in `apps/*`.
- **Security-first**: never commit secrets or sensitive data.


## Getting Started

### Prerequisites
- Node.js 18+ (recommended: Node 20)
- pnpm (recommended)
- Git

Enable pnpm via corepack:
```bash
corepack enable
corepack prepare pnpm@latest --activate
```

## Clone and install
```bash
git clone https://github.com/<your-username>/playwright-testing-framework.git
cd playwright-testing-framework
pnpm install
pnpm exec playwright install
```
## Development Workflow

1) Create a branch
2) 
```bash
git checkout -b feat/my-feature
```
**or**
```bash
git checkout -b fix/my-bug
```

2) Make your changes

Follow repository conventions (see structure below).

3) Run checks locally

Recommended (depending on what exists in the repo):
```bash
pnpm lint
pnpm typecheck
pnpm test:api
pnpm test:e2e
```

4) Commit and push
```bash
git add .
git commit -m "feat: add <short description>"
git push -u origin feat/my-feature
```

5) Open a Pull Request

Open a PR on GitHub and fill in the PR template.

## Code Style & Standards

### General

- Prefer **readable** code over clever abstractions.
- Avoid duplication; extract shared logic into `packages/*`.
- Keep functions small, typed, and testable.
- Do not commit generated files or large binaries.

### TypeScript

- Prefer strict types where possible.
- Avoid `any` unless absolutely necessary (explain why in comments).

### Naming conventions

- Tests: `*.spec.ts`
- Helpers: `*.ts` under `packages/utils`
- Fixtures: under `packages/fixtures`
- API clients: under `packages/api-client`

## Writing Tests
### API tests

- Should validate: status, payload shape, business rules, auth boundaries.
- Prefer API setup/cleanup for test data where possible.
- Keep tests deterministic and isolated.

### E2E tests

- Focus on critical user journeys.
- Prefer stable selectors (getByRole, getByTestId) over CSS/XPath.
- Avoid flaky waits: prefer Playwright auto-waiting and explicit assertions.

## Commit Messages

Use simple conventional-style messages:
- `feat: ...` new feature
- `fix: ...` bug fix
- `docs: ...` documentation only
- `chore: ...` tooling / maintenance
- `refactor: ...` refactor with no behavior change
- `test: ...` add/adjust tests

Examples:
- `feat: add reusable auth fixture for API tests`
- `fix: stabilize e2e login by waiting for navigation`
- `docs: add guide for environment configuration`

## Pull Request Guidelines

A good PR should:
- Have a clear title and description
- Explain the motivation and what changed
- Include screenshots/logs/reports when relevant
- Avoid mixing unrelated changes
- Update docs if behavior changes

### PR Checklist

- [ ] I ran relevant tests locally
- [ ] I updated docs if needed
- [ ] I did not commit secrets
- [ ] My changes are focused and readable

## Reporting Bugs / Requesting Features

### Bugs

Open an issue including:

- What you expected to happen
- What actually happened
- Steps to reproduce
- OS + Node version + Playwright version
- Logs and screenshots (if relevant)

### Feature requests

Open an issue describing:

- The problem you're trying to solve
- Proposed approach (if you have one)
- Alternatives you've considered

## Community Standards

This project follows the Contributor Covenant Code of Conduct.
By participating, you agree to uphold respectful and inclusive behavior.

See: [Code of Conduct](CODE_OF_CONDUCT.md)
