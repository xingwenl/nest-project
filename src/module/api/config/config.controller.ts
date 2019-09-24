import { Controller, Get, Query, Inject, Post, Body } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ApiUseTags, ApiImplicitQuery, ApiOperation } from "@nestjs/swagger";
import { ConfigDto } from "./dto";

@ApiUseTags('config')
@Controller('config')
export class ConfigController {

    constructor(
        private readonly configService: ConfigService
    ){}

    // @Get()
    // async all() {
    //     return ["null"]
    // }

    @Get('/')
    @ApiOperation({title: "配置", description: '获取常用的配置'})
    async getConfigByName(@Query('names') names: string) {
        return this.configService.config(names, 'test')
    }

    @Post('/set')
    @ApiOperation({title: "设置配置"})
    async setConfig(@Body() params: ConfigDto) {
        return this.configService.setConfig(params, 'test')
    }
}
