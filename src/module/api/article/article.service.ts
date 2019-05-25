import { AddTypeDto, ArticleDto, EditArticleDto } from './dto';
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
        let type = await this.articleTypeRep.findOne({
            id: articleDto.type_id
        })
        if (!type) {
            httpRes(ApiErrorCode.ARTICLE_TYPE_INVALID, "文章类型错误")
        }
        await this.articleRep.insert({
            ...articleDto,
            username: req.user.username,
            user_id: req.user.id
        })
        return null
    }

    async findOne(id: string) {
        return await this.articleRep.findOne(id) || {}
    }

    async findAll(page = 0, size = 10) {
        return await this.articleRep.find({
            order: {
                sort: "DESC",
                create_time: "DESC"
            },
            skip: page * size,
            take: size
        })
    }

    async edit(articleDto: EditArticleDto) {
        console.log(articleDto)
        let article = await this.articleRep.findOne({
            id: articleDto.id
        })
        if (!article) {
            httpRes(ApiErrorCode.NOT_FUND, "文章没找到啊")
        }

        // article = {
        //     ...article,
        //     ...articleDto,
        // }
        
        await this.articleRep.update({
            id: articleDto.id,
        }, articleDto)
        return null
    }
}