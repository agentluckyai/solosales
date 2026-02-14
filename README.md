# SoloSales (monorepo)

This repo contains the MVP code skeleton.

- API: NestJS (apps/api)
- DB: Prisma schema + migrations (packages/db)
- Local deps: Postgres + Redis via docker compose (infra/docker-compose.yml)
- Admin: Retool (out of repo)

## Quickstart (local)
```bash
cp .env.example .env

docker compose -f infra/docker-compose.yml up -d

pnpm install
pnpm --filter @solosales/db db:migrate

# API
pnpm api:dev
```
