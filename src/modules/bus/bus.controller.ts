import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { BusService } from './bus.service';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Get('/:busId')
  async getBus(@Param('busId') busId: number) {
    console.log('busId', busId);

    return this.busService.getBus(busId);
  }
}
