import { Injectable } from '@nestjs/common';
import { EventsRepository } from './repository/events.repository';
import { AlertsService } from 'src/alert/alert.service';

@Injectable()
export class EventsService {
  constructor(
    private eventsRepo: EventsRepository,
    private alertsService: AlertsService,
  ) {}

  async create(dto: any) {
    const event = await this.eventsRepo.create({
      os: dto.os,
      tipo: dto.tipo,
      mensagem: dto.mensagem,
      cliente: dto.cliente,
      origem: dto.origem
    });

    await this.process(event);

    return event;
  }

  async process(event: any) {
    try {
      await this.alertsService.createExternal({
        os: event.os,
        cliente: event.cliente,
        tipo: event.tipo,
        mensagem: event.mensagem,
        origem: event.origem
      });

      await this.eventsRepo.markAsProcessed(event.id);

    } catch (err: any) {
      await this.eventsRepo.markAsFailed(event.id, err.message);
    }
  }
}