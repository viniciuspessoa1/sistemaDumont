import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ApiKeyMiddleware } from '../common/middleware/api-key.middleware';
import { AlertsService } from './alert.service';
import { AlertsController } from './alert.controller';
import { AlertsRepository } from './repository/alert.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestMethod } from '@nestjs/common';

@Module({
  providers: [AlertsService, AlertsRepository, PrismaService],
  controllers: [AlertsController],
  exports: [AlertsService],
})
export class AlertModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
