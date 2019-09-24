import { IsString, IsNotEmpty, IsJSON } from "class-validator";
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