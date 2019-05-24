import { AddTypeDto, ArticleDto } from './dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleType } from './../../../common/entities/article/article-type.entity';
import { Article } from './../../../common/entities/article/article.entity';
import { httpRes, ApiErrorCode } from 'src/common/help/http.response';
import { isEmptyObj } from 'src/utils';
@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRep: Repository<Article>,
        @InjectRepository(ArticleType)
        private readonly articleTypeRep: Repository<ArticleType>,
    ){}

    async addType(addType: AddTypeDto) {
        const type = await this.articleTypeRep.findOne({
            title: addType.title
        })
        if (!isEmptyObj(type)) {
            httpRes(
                ApiErrorCode.DUPLICATE_VALUES,
                "类型不能重复",
                null
            )
        }
        await this.articleTypeRep.insert({
            title: addType.title
        })
        return addType
    }

    async editType() {
        const type = await this.articleTypeRep.findByIds([0])
        
    }

    getType() {
        return this.articleTypeRep.find({
            select: ['id', 'title']
        })
    }

    async add(articleDto: ArticleDto, req) {
        await this.articleRep.insert({
            title: articleDto.title,
            type_id: articleDto.type_id,
            is_top: articleDto.is_top || 0,
            memo: articleDto.memo || null,
            content: articleDto.content,
            sort: articleDto.sort || 0,
            username: req.user.username
        })
        return null
    }
}