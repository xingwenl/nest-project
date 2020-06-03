import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
export class StorageDto {
  @ApiModelProperty({
    description: 'key',
  })
  @IsString()
  key: string;

  @IsString()
  @ApiModelProperty({
    description: 'val',
  })
  value: string;

  @ApiModelProperty({
    description: '秒数或者过期日期，日期格式：yyyy/MM/dd HH:mm:ss',
  })
  @IsString()
  @IsOptional()
  expires?: string;

  @ApiModelProperty()
  @IsString()
  @IsOptional()
  intro?: string;
}
