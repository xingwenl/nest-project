import { Inject, Req, Param, Query, Header, HttpCode, Options } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AddTypeDto, ArticleDto, EditArticleDto } from './dto';
import { JwtAuth } from './../../../common/decorator/jwt-auth.decorator';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";

@ApiUseTags('article')
@Controller('article')
export class ArticleController {

    constructor(
        private readonly articleService: ArticleService,
    ){}

    @ApiOperation({title: "获取类型 🀄️️️"})
    @Get('type')
    async type() {
        return await this.articleService.getType()
    }

    @ApiOperation({title: "首页的接口", description: '首页坑货'})
    @Get('home')
    home() {
        return this.articleService.home()
    }
    @Get('socket')
    async socket(@Query('id') id: string) {
        console.log('ssss', id)
        return this.articleService.getSocket(id)
    }

    @Get(":id")
    one(@Param('id') id: string) {
        return this.articleService.findOne(id);
    }
    

    @Get()
    all(@Query('page') page: number, @Query('size') size: number, @Query('type_id') type_id?: number) {
        return this.articleService.findAll(page, size, type_id)
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

    @HttpCode(200)
    @Post('edit_type') 
    editType() {
        return 'edit/type'
    }

   
}