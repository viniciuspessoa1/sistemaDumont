import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowUpRepository {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.followUp.create({ data });
  }

  findExpired() {
    return this.prisma.followUp.findMany({
      where: {
        resolvido: false,
        prazo: { lt: new Date() },
      },
    });
  }

  resolve(id: string) {
    return this.prisma.followUp.update({
      where: { id },
      data: { resolvido: true },
    });
  }
}