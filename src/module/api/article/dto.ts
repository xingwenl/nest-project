import { IsString, IsInt, IsOptional } from 'class-validator';
export class AddTypeDto {
    @IsString()
    title: string;
    
    @IsOptional()
    img: string
} 

export class EditTypeDto {
    @IsInt()
    id: number;

    @IsString()
    title: string;

    @IsOptional()
    img: string
}


export class ArticleDto {
    
    @IsString()
    title: string;

    @IsInt()
    type_id: number;
    
    @IsString()
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

export class EditArticleDto {

    @IsInt()
    id: number

    @IsOptional()
    @IsString()
    title: string;

    
    @IsOptional()
    @IsInt()
    type_id: number;
    
    @IsOptional()
    @IsString()
    memo?: string

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsInt()
    is_top?: number;

    @IsOptional()
    @IsInt()
    sort?: number;
}