import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EventsModule } from './events/events.module';
import { AlertModule } from './alert/alert.module';
import { SecurityModule } from './security/security.module';
import { CronModule } from './cron/cron.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    ScheduleModule.forRoot(),
    EventsModule,
    AlertModule,
    SecurityModule,
    CronModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      }
    ]),
  ],
})
export class AppModule {}