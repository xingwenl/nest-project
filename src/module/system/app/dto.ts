import {
  IsNumber,
  IsNotEmpty,
  IsJSON,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AppDto {
  @ApiModelProperty({
    description: '应用代码'
  })
  @IsString()
  @IsNotEmpty()
  app_code: string;

  @ApiModelProperty({
    description: '应用名称'
  })
  @IsString()
  @IsNotEmpty()
  app_name: string;

  @ApiModelProperty({
    description: '应用版本'
  })
  @IsString()
  @IsNotEmpty()
  app_version: string;
}