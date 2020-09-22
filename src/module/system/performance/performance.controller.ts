import {
  Controller,
  Get,
  Query,
  Inject,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { PerformanceService } from './performance.service';
import {
  ApiUseTags,
  ApiImplicitQuery,
  ApiOperation,
  ApiModelProperty,
} from '@nestjs/swagger';
import { PerformanceDto } from './dto';

@ApiUseTags('System')
@Controller('/system/performance')
export class PerformanceController {
  constructor(private readonly service: PerformanceService) {}

  // @Get()
  // async all() {
  //     return ["null"]
  // }

  @Get('/')
  @ApiOperation({ title: '提交', description: '提交性能信息' })
  @ApiModelProperty({
    required: false,
  })
  async setPerformance(@Query() query: PerformanceDto) {
    return this.service.setPerformance(query);
  }
}
