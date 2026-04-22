import { Injectable } from '@nestjs/common';
import { AlertsRepository } from './alert.repository';
import { CreateAlertDto } from './dtos/create-alert.dto';
import { CreateAlertExternalDto } from './dtos/create-alert-external.dto';

@Injectable()
export class AlertService {
  constructor(private repo: AlertsRepository) {}

  async createOrUpdateExternal(dto: CreateAlertExternalDto) {
  const existing = await this.repo.findByOsAndTipo(
    dto.os,
    dto.tipo
  );

  if (existing) {
    return this.repo.update(existing.id, {
      tipo: dto.tipo,
      cliente: dto.cliente
    });
  }

  return this.repo.create({
    os: dto.os,
    cliente: dto.cliente,
    tipo: dto.tipo,
    mensagem: dto.mensagem,
    email: dto.email,
    // origem: dto.origem
  });
}

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