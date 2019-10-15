import { IsString, IsNotEmpty, IsJSON, IsInt, IsOptional } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class ConfigDto {
    @ApiModelProperty({
        description: 'key值'
    })
    @IsString()
    @IsNotEmpty()
    key: string;

    @ApiModelProperty({
        description: 'json格式的数据'
    })
    @IsString()
    @IsJSON()
    val: string;
}


export class ConfigEditDto {
    @IsInt()
    @IsNotEmpty()
    @ApiModelProperty({
        description: '唯一id'
    })
    id: number;

    @ApiModelProperty({
        description: 'key值'
    })
    @IsString()
    @IsOptional()
    key: string;

    @ApiModelProperty({
        description: 'json格式的数据'
    })
    @IsString()
    @IsJSON()
    @IsOptional()
    val?: string;
}