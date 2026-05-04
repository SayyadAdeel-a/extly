# Workflow — Extly

## TDD Policy
- **Strictness:** Flexible (Moderate). Tests recommended for complex logic (Scraper, Change Detection).
- **Tooling:** Not specified in V1 rules, but expected to follow industry standards if implemented.

## Commit Strategy
- **Conventions:** Descriptive messages focusing on clarity.
- **Workflow:** Task-based commits.

## Verification Checkpoints
- Manual verification after each phase completion.
- Automated validation (linting) after every code change.

## Coding Standards (Rule 05)
- Interfaces over Type Aliases.
- Explicit return types for API routes.
- Import order: Next/React -> 3rd Party -> Internal Lib -> Components -> Types.

## Security Protocols (Rule 06)
- Magic link only.
- Strict input validation (Chrome ID regex).
- RLS enforced on all private tables.
- Cron endpoint verification via Bearer token.
