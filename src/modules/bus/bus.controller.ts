import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { BusService } from './bus.service';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Get('/:strSrch')
  async getBus(@Param('strSrch') strSrch: number) {
    return this.busService.getBus(strSrch);
  }
}
