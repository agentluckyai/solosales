import type { ConnectionOptions } from 'bullmq';

export function redisConnectionOptionsFromUrl(redisUrl: string): ConnectionOptions {
  const url = new URL(redisUrl);

  const port = url.port ? Number(url.port) : 6379;
  if (!Number.isFinite(port)) {
    throw new Error(`Invalid REDIS_URL port: ${url.port}`);
  }

  // URL pathname for ioredis db is like "/0"
  const dbStr = url.pathname?.replace('/', '');
  const db = dbStr ? Number(dbStr) : 0;

  const tls = url.protocol === 'rediss:' ? {} : undefined;

  return {
    host: url.hostname,
    port,
    username: url.username || undefined,
    password: url.password || undefined,
    db: Number.isFinite(db) ? db : 0,
    tls,
  };
}
