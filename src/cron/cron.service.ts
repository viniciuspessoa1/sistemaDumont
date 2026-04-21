import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CronService {
  constructor(private prisma: PrismaService) {}

  @Cron('0 * * * *')
  async checkSLA() {
    const atrasados = await this.prisma.followUp.findMany({
      where: {
        resolvido: false,
        prazo: { lt: new Date() },
      },
    });

    for (const f of atrasados) {
      await this.prisma.alert.create({
        data: {
          os: f.os,
          cliente: '',
          tipo: 'sla',
          mensagem: `OS ${f.os} atrasada`,
          email: 'usuarioB@gmail.com',
        },
      });

      await this.prisma.followUp.update({
        where: { id: f.id },
        data: { resolvido: true },
      });
    }
  }
}