# SoloSales (monorepo)

This repo contains the MVP code skeleton.

- API: NestJS (apps/api)
- DB: Prisma schema + migrations (packages/db)
  - Orders: status + append-only status transitions
  - Ledger: append-only wallet entries
  - Provider audit: append-only request/response payloads (redaction at app layer)
- Local deps: Postgres + Redis via docker compose (infra/docker-compose.yml)
- Admin: Retool (out of repo)

## Quickstart (local)

### 0) Prereqs
- Node.js >= 22
- pnpm (repo pins pnpm@10)
- Docker Desktop (for Postgres + Redis)

### 1) Setup env
```bash
cp .env.example .env
```

### 2) Start local dependencies
```bash
docker compose -f infra/docker-compose.yml up -d
```

### 3) Install deps
```bash
pnpm install
```

### 4) Run DB migrations
```bash
pnpm db:migrate
```

### 5) Run API + Worker
In two terminals:
```bash
pnpm api:dev
```

```bash
pnpm worker:dev
```

### 6) Smoke tests
Healthcheck:
```bash
curl -s http://localhost:3000/healthz | jq
```

Enqueue a BullMQ job (worker logs should show it):
```bash
curl -s -X POST http://localhost:3000/debug/enqueue \
  -H 'content-type: application/json' \
  -d '{"name":"ping","payload":{"from":"readme"}}' | jq
```
