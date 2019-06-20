import { Inject, Req, Param, Query, Header } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AddTypeDto, ArticleDto, EditArticleDto } from './dto';
import { JwtAuth } from './../../../common/decorator/jwt-auth.decorator';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('article')
export class ArticleController {

    constructor(
        private readonly articleService: ArticleService
    ){}

    @Get('type')
    async type() {
        return await this.articleService.getType()
    }

    @Get(":id")
    one(@Param('id') id: string) {
        return this.articleService.findOne(id);
    }

    @Get()
    all(@Query('page') page: number, @Query('size') size: number ) {
        return this.articleService.findAll(page, size)
    }

    

    @Post()
    @JwtAuth()
    add(@Body() articleDto: ArticleDto, @Req() req) {
        return this.articleService.add(articleDto, req)
    }

    @Post('edit')
    edit(@Body() articleDto: EditArticleDto) {
        return this.articleService.edit(articleDto)
    }

   
    

    @Post('add_type') 
    @JwtAuth()
    async addType(@Body() addType: AddTypeDto) {
        return this.articleService.addType(addType)
    }

    @Post('edit_type') 
    editType() {
        return 'edit/type'
    }
}