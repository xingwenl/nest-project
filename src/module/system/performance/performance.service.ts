import { Injectable } from '@nestjs/common';
import { httpRes, ApiErrorCode } from '../../../common/help/http.response';
import { PerformanceDto } from './dto';
import { jsonToObj } from '../../../utils';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { SystemApp } from '../../../common/entities/system/system-app.entity';
import { SystemPerformance } from '../../../common/entities/system/system-performance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(SystemApp)
    private readonly systemAppRep: Repository<SystemApp>,
    @InjectRepository(SystemPerformance)
    private readonly systemPerformanceRep: Repository<SystemPerformance>,
  ) {}

  async setPerformance(query: PerformanceDto) {
    console.log('setPerformance', query);
    const res = await this.systemPerformanceRep.save(query);
    return res.id;
  }
}
