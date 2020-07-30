import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';

export class GetTokenDto {
  @ApiModelProperty({
    description: '用户id',
  })
  @IsString()
  userId: string;

  @ApiModelProperty({
    description: '姓名',
  })
  @IsString()
  name: string;

  @ApiModelProperty({
    description: '头像',
  })
  @IsString()
  portraitUri: string;
}