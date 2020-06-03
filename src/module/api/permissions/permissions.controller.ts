import { JwtAuth } from './../../../common/decorator/jwt-auth.decorator';
import { PEditDto, PAddDto, PDeleteDto } from './dto';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { Controller, Get, Post, Query, Body, Req } from '@nestjs/common';

@ApiUseTags('permissions')
@Controller('permissions')
@ApiBearerAuth()
export class PermissionsController {
  constructor(private readonly pService: PermissionsService) {}

  @Get('/list')
  list(@Query('page') page: number, @Query('size') size: number) {
    return this.pService.list(page, size);
  }

  @Post('/edit')
  edit(@Body() dto: PEditDto) {
    return this.pService.edit(dto);
  }

  @ApiOperation({
    title: '添加',
  })
  @Post('/add')
  @JwtAuth()
  add(@Body() dto: PAddDto, @Req() req: any) {
    return this.pService.add(dto, req);
  }

  @Post('/delete')
  delete(@Body() dto: PDeleteDto) {
    return this.pService.delete(dto);
  }
}
