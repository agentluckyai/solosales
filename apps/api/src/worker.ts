import { Worker } from 'bullmq';
import { loadEnv } from './env';
import { queueName } from './queue.constants';
import { redisConnectionOptionsFromUrl } from './redis.connection';

const env = loadEnv();

// eslint-disable-next-line no-console
console.log(`[worker] starting for queue: ${queueName}`);

const worker = new Worker(
  queueName,
  async (job) => {
    // eslint-disable-next-line no-console
    console.log(`[worker] job`, {
      name: job.name,
      id: job.id,
      data: job.data,
    });

    if (job.name === 'ping') {
      return { ok: true, pong: true };
    }

    return { ok: true };
  },
  {
    connection: redisConnectionOptionsFromUrl(env.REDIS_URL),
  },
);

worker.on('failed', (job, err) => {
  // eslint-disable-next-line no-console
  console.error('[worker] job failed', { id: job?.id, name: job?.name, err });
});

async function shutdown(signal: string) {
  // eslint-disable-next-line no-console
  console.log(`[worker] shutting down (${signal})`);
  await Promise.allSettled([worker.close()]);
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
