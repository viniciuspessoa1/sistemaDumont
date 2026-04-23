import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityModule } from '../security/security.module';
import { AlertModule } from 'src/alert/alert.module';
import { EventsRepository } from './repository/events.repository';
import { EventsWorker } from './events.worker';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PrismaService, EventsRepository, EventsWorker],
  imports: [SecurityModule, AlertModule],
})
export class EventsModule {}