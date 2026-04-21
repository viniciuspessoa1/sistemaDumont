import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ApiKeyMiddleware } from '../common/middleware/api-key.middleware';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { AlertsRepository } from './alert.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AlertService, AlertsRepository, PrismaService],
  controllers: [AlertController],
  exports: [AlertService],
})
export class AlertModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('alerts');
  }
}
