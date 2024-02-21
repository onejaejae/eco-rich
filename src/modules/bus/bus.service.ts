import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EcoConfigService } from 'src/core/config/config.service';

@Injectable()
export class BusService {
  constructor(
    private readonly configService: EcoConfigService,
    private readonly httpService: HttpService,
  ) {}

  private generateURL(strSrch: number) {
    return `http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?strSrch=${strSrch}&serviceKey=${process.env.OPEN_API_ACCESS_KEY}&resultType=json `;
  }

  async getBus(strSrch: number) {
    const url = this.generateURL(strSrch);

    const {
      data: { msgBody },
    } = await this.httpService.axiosRef.get(url);
    return msgBody;
  }
}
