import { CustomLogger } from './../../logger/logger';
import { CommonModule } from './../../../common/common.module';
// import { JwtAuth } from './../../../common/decorator/jwt-auth.decorator';
import { JwtAuth } from '../../../common/decorator/jwt-auth.decorator';
import { StorageDto } from './dto';
import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import {
  Controller,
  Get,
  Injectable,
  Query,
  Post,
  Body,
  Req,
  LoggerService,
} from '@nestjs/common';

@ApiUseTags('storage')
@Controller('storage')
@ApiBearerAuth()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @ApiOperation({
    title: '获取存储值',
  })
  @Get('/get')
  @JwtAuth()
  get(
    @Query('size') size: number,
    @Query('page') page: number,
    @Query('key') key?: string,
    @Req() req?: any,
  ) {
    return this.storageService.get(req.user.id, key, page, size);
  }

  @ApiOperation({
    title: '存值',
  })
  @Post('/set')
  @JwtAuth()
  set(@Body() dto: StorageDto, @Req() req: any) {
    return this.storageService.set(dto, req.user.id);
  }
}
