import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AlertService } from 'src/alert/alert.service';
import { CreateEventDto } from './dtos/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private alertService: AlertService,
  ) {}

  async process(data: CreateEventDto) {
    switch (data.tipo) {
      case 'peca_nao_solicitada':
        return this.alertService.createAlert(data, 'Peça não solicitada')

      case 'peca_estoque':
        await this.alertService.createAlert(data, 'Peça em estoque');
        return this.createFollowUp(data, 'agendamento');

      case 'retorno_estoque':
        await this.alertService.createAlert(data, 'Retorno em estoque');
        return this.createFollowUp(data, 'retorno');
    }
  }

  async createFollowUp(data: any, tipo: string) {
    return this.prisma.followUp.create({
      data: {
        os: data.os,
        tipo,
        prazo: new Date(Date.now() + 5 * 86400000),
      },
    });
  }
}