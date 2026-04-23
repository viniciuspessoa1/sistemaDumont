import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EventsRepository } from './repository/events.repository';
import { EventsService } from './events.service';

@Injectable()
export class EventsWorker {
  constructor(
    private repo: EventsRepository,
    private service: EventsService
  ) {}

  @Cron('*/30 * * * * *')
  async handleQueue() {
    const events = await this.repo.findUnprocessed(10);

    for (const event of events) {
      await this.service.process(event);
    }
  }
}