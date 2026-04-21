import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityModule } from '../security/security.module';
import { AlertModule } from 'src/alert/alert.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PrismaService],
  imports: [SecurityModule, AlertModule],
})
export class EventsModule {}