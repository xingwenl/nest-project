import { Injectable } from '@nestjs/common';
import { httpRes, ApiErrorCode } from '../../../common/help/http.response';
import { jsonToObj } from '../../../utils';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { SystemApp } from '../../../common/entities/system/system-app.entity';
import { Repository } from 'typeorm';
import { AppDto } from './dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(SystemApp)
    private readonly systemAppRep: Repository<SystemApp>,
  ) {}

  async setApp(body: AppDto) {
    const res = await this.systemAppRep.save(body);
    return res;
  }
}
