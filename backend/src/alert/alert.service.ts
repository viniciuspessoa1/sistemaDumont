import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}

  async createExternal(dto: any) {
    const exists = await this.prisma.alert.findUnique({
      where: {
        os_tipo_origem: {
          os: dto.os,
          tipo: dto.tipo,
          origem: dto.origem
        }
      }
    });

    if (exists) return exists;

    return this.prisma.alert.create({
      data: {
        os: dto.os,
        cliente: dto.cliente,
        tipo: dto.tipo,
        mensagem: dto.mensagem,
        email: dto.email,
        origem: dto.origem,
      }
    });
  }

  async getPending() {
    return this.prisma.alert.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  }

  async markAsRead(ids: string[]) {
    return this.prisma.alert.updateMany({
      where: { id: { in: ids } },
      data: {
        status: 'READ',
        readAt: new Date()
      }
    });
  }
}