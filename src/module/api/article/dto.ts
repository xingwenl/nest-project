import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';
export class AddTypeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  img: string;
}

export class EditTypeDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  img: string;
}

export class ArticleDto {
  @IsString()
  title: string;

  @IsInt()
  type_id: number;

  @IsString()
  memo?: string;

  @IsString()
  content: string;

  @IsString()
  render_content: string;

  @IsOptional()
  @IsInt()
  is_top?: number;

  @IsOptional()
  @IsInt()
  sort?: number;
}

export class DeleteArticleDto {
  @IsInt()
  id: number;
}

export class EditArticleDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  type_id: number;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsInt()
  is_top?: number;

  @IsOptional()
  @IsInt()
  sort?: number;

  @IsOptional()
  @IsString()
  render_content?: string;
}
