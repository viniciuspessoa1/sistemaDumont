import { ScheduleModule } from '@nestjs/schedule';
import { EventsModule } from './events/events.module';
import { AlertModule } from './alert/alert.module';
import { SecurityModule } from './security/security.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ApiKeyMiddleware } from './common/middleware/api-key.middleware';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventsModule,
    AlertModule,
    SecurityModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      }
    ]),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}