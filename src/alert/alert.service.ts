import { Injectable } from '@nestjs/common';
import { AlertsRepository } from './alert.repository';
import { CreateAlertDto } from './dtos/create-alert.dto';

@Injectable()
export class AlertService {
  constructor(private repo: AlertsRepository) {}

  async createAlert(data: CreateAlertDto, mensagemBase: string) {
    try {
      const mensagem = `${mensagemBase} - OS ${data.os} (${data.cliente})`
      return await this.repo.create({
        os: data.os,
        cliente: data.cliente,
        tipo: data.tipo,
        mensagem,
        email: data.email,
      });
    } catch(error) {
      // idempotência (unique constraint)
      console.error(error)
      throw error
    }
  }

  getAlerts(email: string) {
    return this.repo.findPending(email);
  }

  markAsRead(ids: string[]) {
    return this.repo.markAsRead(ids);
  }
}