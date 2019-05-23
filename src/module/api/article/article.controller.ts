import { Inject } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AddTypeDto } from './dto';
import { JwtAuth } from './../../../common/decorator/jwt-auth.decorator';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('article')
export class ArticleController {

    constructor(
        private readonly articleService: ArticleService
    ){}

    @Get()
    all() {
        return 'all'
    }

    @Post()
    @JwtAuth()
    add() {
        return 'add 成功'
    }

    @Post('edit')
    edit() {
        return 'edit'
    }

    @Get('type')
    type() {
        return this.articleService.getType()
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