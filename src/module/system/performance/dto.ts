import {
  IsNumber,
  IsNotEmpty,
  IsJSON,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PerformanceDto {
  @ApiModelProperty({
    description: '应用代码'
  })
  @IsString()
  app_code: string;

  @ApiModelProperty({
    description: '当前页面url'
  })
  @IsString()
  page_url: string;

  @ApiModelProperty({
    description: '准备新页面时间耗时'
  })
  @IsNumber()
  @IsOptional()
  prepare_newpage_time: number;

  @ApiModelProperty({
    description: 'DNS查询耗时'
  })
  @IsNumber()
  @IsOptional()
  dns_time: number;
  
  @ApiModelProperty({
    description: 'TCP链接耗时'
  })
  @IsNumber()
  @IsOptional()
  tcp_time: number;

  @ApiModelProperty({
    description: 'request请求耗时'
  })
  @IsNumber()
  @IsOptional()
  request_time: number;

  @ApiModelProperty({
    description: '解析dom树耗时'
  })
  @IsNumber()
  @IsOptional()
  analysis_dom_time: number;

  @ApiModelProperty({
    description: '白屏时间'
  })
  @IsNumber()
  @IsOptional()
  white_screen_time: number;

  @ApiModelProperty({
    description: 'dom准备时间'
  })
  @IsNumber()
  @IsOptional()
  dom_ready_time: number;

  @ApiModelProperty({
    description: 'onload执行完成时间'
  })
  @IsNumber()
  @IsOptional()
  onload_success_time: number;

  @ApiModelProperty({
    description: '页面的加载方式'
  })
  @IsString()
  @IsOptional()
  load_type_str: string;

  @ApiModelProperty({
    description: '页面的加载方式类型'
  })
  @IsNumber()
  @IsOptional()
  load_type: number;
}