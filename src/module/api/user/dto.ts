import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from "@nestjs/swagger";
export class LoginDto {
    @ApiModelProperty({
        example: 'lixingwen1'
    })
    @IsString()
    username: string;

    @ApiModelProperty({
        example: '123456',
    })
    @IsString()
    password: string;
} 

export class RegisterDto {
    @ApiModelProperty({
        type: String,
        description: '用户名'
    })
    @IsString()
    username: string;

    @ApiModelProperty({
        type: String,
        description: '密码'
    })
    @IsString()
    password: string;
}

export class EditDto {
    @IsInt()
    age: number
}