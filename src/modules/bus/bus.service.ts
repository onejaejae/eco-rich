import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EcoConfigService } from 'src/core/config/config.service';

@Injectable()
export class BusService {
  constructor(
    private readonly configService: EcoConfigService,
    private readonly httpService: HttpService,
  ) {}

  private generateURL(busId: number) {
    const openApiConfig = this.configService.getOpenApiConfig();

    return `http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?busRouteId=${busId}&serviceKey=${openApiConfig.OPEN_API_ACCESS_KEY}`;
  }

  async getBus(busId: number) {
    const url = this.generateURL(busId);

    const { data } = await this.httpService.axiosRef.get(url);
    console.log('data', data);
  }
}
