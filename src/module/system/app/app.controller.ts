import {
  Controller,
  Get,
  Query,
  Inject,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiUseTags,
  ApiImplicitQuery,
  ApiOperation,
  ApiModelProperty,
} from '@nestjs/swagger';
import { AppDto } from './dto';

@ApiUseTags('System')
@Controller('/system/app')
export class AppController {
  constructor(private readonly service: AppService) {}

  // @Get()
  // async all() {
  //     return ["null"]
  // }

  @Post('/add')
  @ApiOperation({ title: '应用', description: '添加app' })
  async setPerformance(@Body() body: AppDto) {
    return this.service.setApp(body);
  }
}
