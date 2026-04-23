import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EventsRepository {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.event.create({ data });
  }

  findUnprocessed(limit = 10) {
    return this.prisma.event.findMany({
      where: {
        processed: false,
        retries: { lt: 5 }
      },
      orderBy: { createdAt: 'asc' },
      take: limit
    });
  }

  markAsProcessed(id: string) {
    return this.prisma.event.update({
      where: { id },
      data: { processed: true, error: null }
    });
  }

  markAsFailed(id: string, error: string) {
    return this.prisma.event.update({
      where: { id },
      data: {
        retries: { increment: 1 },
        error
      }
    });
  }
}