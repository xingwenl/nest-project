import { IsString } from 'class-validator';
export class LoginDto {
    username: string;
    password: string;
} 

export class RegisterDto {
    @IsString()
    username: string;
    @IsString()
    password: string;
}