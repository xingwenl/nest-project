import {
  Controller,
  Get,
  Query,
  Inject,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import {
  ApiUseTags,
  ApiImplicitQuery,
  ApiOperation,
  ApiModelProperty,
} from '@nestjs/swagger';
import { ConfigDto, ConfigEditDto } from './dto';

@ApiUseTags('config')
@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  // @Get()
  // async all() {
  //     return ["null"]
  // }

  @Get('/')
  @ApiOperation({ title: '配置', description: '获取常用的配置' })
  @ApiModelProperty({
    required: false,
  })
  async getConfigByName(@Query('names') names?: string) {
    return this.configService.config('test', names);
  }

  @Post('/edit')
  @ApiOperation({ title: '修改' })
  async edit(@Body() params: ConfigEditDto) {
    return this.configService.editConfig(params, 'test');
  }

  @Post('/set')
  @ApiOperation({ title: '设置配置' })
  async setConfig(@Body() params: ConfigDto) {
    return this.configService.setConfig(params, 'test');
  }
}
