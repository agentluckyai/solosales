import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { DebugController } from './debug.controller';

@Module({
  imports: [],
  controllers: [AppController, HealthController, DebugController],
  providers: [AppService],
})
export class AppModule {}
