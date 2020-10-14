import {
  Controller,
  Get,
  Query,
  Req,
  Inject,
  Post,
  Body,
  Param,
  Request,
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
  async setPerformance(@Query() query: PerformanceDto, @Req() req: Request) {
    console.log(req);
    console.log('connection', req['connection']);
    console.log('connection', req['connection']['remoteAddress']);
    // headers['user-agent']
    return this.service.setPerformance(query);
  }
}
