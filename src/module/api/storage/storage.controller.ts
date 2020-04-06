import { StorageDto } from './dto';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { Controller, Get, Injectable, Query, Post, Body } from '@nestjs/common';

@ApiUseTags('storage')
@Controller('storage')
export class StorageController {
    constructor(
        private readonly storageService: StorageService
    ){}

    @Get('/get') 
    @ApiOperation({
        title: '获取存储值'
    })
    get(@Query('key') key: string, @Query('creater_id') creater_id: string){
        return this.storageService.get(key, creater_id);
    }

    @ApiOperation({
        title: '存值'
    })
    @Post('/set')
    set(@Body() dto: StorageDto) {
        return this.storageService.set(dto);
    }
}