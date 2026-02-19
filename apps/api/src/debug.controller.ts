import { Controller, Post, Body } from '@nestjs/common';
import { solosalesQueue } from './queue';

@Controller('/debug')
export class DebugController {
  @Post('/enqueue')
  async enqueue(
    @Body()
    body: {
      name?: string;
      payload?: unknown;
    },
  ) {
    const name = body?.name ?? 'ping';

    const job = await solosalesQueue.add(
      name,
      {
        payload: body?.payload ?? { hello: 'world' },
      },
      {
        removeOnComplete: 1000,
        removeOnFail: 1000,
      },
    );

    return {
      ok: true,
      job: {
        id: job.id,
        name: job.name,
      },
    };
  }
}
