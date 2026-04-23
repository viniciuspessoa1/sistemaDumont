import { Body, Controller, Get, Patch } from '@nestjs/common';
import { AlertsService } from './alert.service';

@Controller('alerts')
export class AlertsController {
  constructor(private service: AlertsService) {}

  @Get()
  get() {
    return this.service.getPending();
  }

  @Patch('read')
  mark(@Body() body: { ids: string[] }) {
    return this.service.markAsRead(body.ids);
  }
}