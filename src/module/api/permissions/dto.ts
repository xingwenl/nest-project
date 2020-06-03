import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';

export class PAddDto {
  @ApiModelProperty({
    description: '说明文字',
  })
  @IsString()
  title: string;

  @ApiModelProperty({
    description: '角色',
  })
  @IsArray()
  roles: string[];

  @ApiModelProperty({
    description: '正则表达',
  })
  @IsString()
  reg: string;
}
export class PDeleteDto {
  @IsInt()
  id: number;
}
export class PEditDto {
  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsArray()
  @IsOptional()
  roles: string[];

  @IsString()
  @IsOptional()
  reg: string;

  @IsInt()
  @IsOptional()
  user_id: number;
}
