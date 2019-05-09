import { Controller, Get, Req, Post, Param, Body } from '@nestjs/common';
import { Request } from "express";
import { CreateCatDto } from './creat-cat.dto'

@Controller('cats')
export class CatsController {

    @Post()
    create(@Body() createCatDto: CreateCatDto): string {
        return `This action adds anew cat${createCatDto.name} ${createCatDto.age} ${createCatDto.breed}`;
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id)
        return `This action returns a #${params.id} cat`;
    }

    @Get()
    findAll(@Req() request: Request): string {
        return 'This action returns all cats';
    }
}
