import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { loadEnv } from './env';

const env = loadEnv();
const connection = new IORedis(env.REDIS_URL, { maxRetriesPerRequest: null });

const queueName = 'solosales';

// eslint-disable-next-line no-console
console.log(`[worker] starting for queue: ${queueName}`);

new Worker(
  queueName,
  async (job) => {
    // eslint-disable-next-line no-console
    console.log(`[worker] job`, job.name, job.id);
    return { ok: true };
  },
  { connection },
);
