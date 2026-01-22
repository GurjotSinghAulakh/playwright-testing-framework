# Security Policy

Thank you for helping keep this project and its users secure.  
We take security issues seriously and appreciate responsible disclosures.

## Supported Versions

This project is currently supported on the latest `main` branch.

If you are using an older fork or snapshot, we recommend updating to the latest version before reporting.

## Reporting a Vulnerability

If you believe you have found a security vulnerability, please **do not** open a public GitHub issue.

Instead, report it privately:

- Email: `gs@aulakh.no`
- Subject: `Security vulnerability report - Playwright Testing Framework`

Please include:
- A clear description of the issue
- Steps to reproduce (proof of concept if possible)
- Impact assessment (what could an attacker do?)
- Any suggested fixes or mitigations (optional)

We will acknowledge receipt as soon as possible and keep you informed during the investigation.

## Disclosure Policy

We follow responsible disclosure practices:
- We will investigate and validate reported vulnerabilities
- We will work on a fix and coordinate a release if needed
- We may credit the reporter (only with consent)

## Common Security Notes for This Repository

Because this is a test framework repo, typical security concerns include:
- Accidental committing of secrets in `.env` files
- Logging sensitive tokens in CI output
- Storing session traces/videos containing personal data
- Unsafe example code that encourages insecure patterns

### Recommendations
- Never commit `.env` files or credentials
- Use CI secrets storage for tokens and passwords
- Be careful with test traces and videos in public repos
- Avoid including real customer/user data in fixtures or test files

## Security Updates

Security-related fixes will be documented in release notes (if/when releases are used). Until then, updates will be visible via commits to `main`.
