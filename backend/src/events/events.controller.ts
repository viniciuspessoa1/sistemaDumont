import { Controller, Post, Body, Headers } from '@nestjs/common';
import { EventsService } from './events.service';
import { SecurityService } from '../security/security.service';
import { CreateEventDto } from './dtos/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private security: SecurityService,
  ) {}

  @Post()
  create(@Body() dto: any) {
    console.log(dto);
    return this.eventsService.create(dto);
  }

  @Post()
  handle(@Body() body: CreateEventDto, @Headers('x-signature') sig: string) {
    // this.security.validate(body, sig);
    return this.eventsService.process(body);
  }
}