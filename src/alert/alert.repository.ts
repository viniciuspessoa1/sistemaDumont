import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlertsRepository {
  constructor(private prisma: PrismaService) {}

  async findByOsAndTipo(os: string, tipo: string) {
    return this.prisma.alert.findFirst({
      where: {
        os,
        tipo
      }
    });
  }

  async update(id: string, data: any) {
    return this.prisma.alert.update({
      where: { id },
      data,
    });
  }

  create(data: Prisma.AlertCreateInput) {
      return this.prisma.alert.create({ data });
  }

  findPending(email: string) {
    return this.prisma.alert.findMany({
      where: { email, lido: false },
      orderBy: { createdAt: 'asc' },
    });
  }

  markAsRead(ids: string[]) {
    return this.prisma.alert.updateMany({
      where: { id: { in: ids } },
      data: { lido: true },
    });
  }
}