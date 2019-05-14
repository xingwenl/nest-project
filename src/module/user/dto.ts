import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from "@nestjs/swagger";
export class LoginDto {
    @ApiModelProperty()
    @IsString()
    username: string;

    @ApiModelProperty()
    @IsString()
    password: string;
} 

export class RegisterDto {
    @IsString()
    username: string;
    @IsString()
    password: string;
}

export class EditDto {
    @IsInt()
    age: number
}