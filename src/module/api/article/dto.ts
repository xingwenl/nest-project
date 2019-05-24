import { IsString, IsInt, IsOptional } from 'class-validator';
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


export class ArticleDto {
    @IsString()
    title: string;

    @IsInt()
    type_id: number;
    
    memo?: string

    @IsString()
    content: string;

    @IsOptional()
    @IsInt()
    is_top?: number;

    @IsOptional()
    @IsInt()
    sort?: number;
}