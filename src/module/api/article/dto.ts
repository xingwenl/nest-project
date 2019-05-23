import { IsString, IsInt } from 'class-validator';
export class AddTypeDto {
    @IsString()
    title: string;
} 

export class EditTypeDto {
    @IsInt()
    id: number;

    @IsString()
    title: string;
}
