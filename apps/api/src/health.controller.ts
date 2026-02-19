import { Controller, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import IORedis from 'ioredis';
import { loadEnv } from './env';

@Controller()
export class HealthController {
  @Get('/healthz')
  async healthz() {
    const env = loadEnv();

    const startedAt = Date.now();

    const db = new PrismaClient({
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    });

    const redis = new IORedis(env.REDIS_URL, { maxRetriesPerRequest: 0 });

    try {
      // DB ping
      await db.$queryRaw`SELECT 1`;

      // Redis ping
      const pong = await redis.ping();
      if (pong !== 'PONG') {
        throw new Error(`Unexpected Redis PING response: ${pong}`);
      }

      return {
        ok: true,
        db: 'ok',
        redis: 'ok',
        uptimeSec: process.uptime(),
        durationMs: Date.now() - startedAt,
        ts: new Date().toISOString(),
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return {
        ok: false,
        error: message,
        durationMs: Date.now() - startedAt,
        ts: new Date().toISOString(),
      };
    } finally {
      await Promise.allSettled([db.$disconnect(), redis.quit()]);
    }
  }
}
