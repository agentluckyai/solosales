import { Queue } from 'bullmq';
import { loadEnv } from './env';
import { queueName } from './queue.constants';
import { redisConnectionOptionsFromUrl } from './redis.connection';

const env = loadEnv();

export const solosalesQueue = new Queue(queueName, {
  connection: redisConnectionOptionsFromUrl(env.REDIS_URL),
});
