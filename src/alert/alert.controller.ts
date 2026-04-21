import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AlertService } from './alert.service';

@Controller('alerts')
export class AlertController {
  constructor(private service: AlertService) {}

  @Get()
  get(@Query('email') email: string) {
    return this.service.getAlerts(email);
  }

  @Post('read')
  read(@Body() ids: string[]) {
    return this.service.markAsRead(ids);
  }
}