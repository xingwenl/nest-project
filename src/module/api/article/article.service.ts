import { AddTypeDto, ArticleDto, EditArticleDto } from './dto';
import { Injectable, Logger } from '@nestjs/common';
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
        let res = await this.articleTypeRep.save({
            title: addType.title,
            img: addType.img
        })
        return res
    }

    async editType() {
        const type = await this.articleTypeRep.findByIds([0])
        
    }

    getType() {
        return this.articleTypeRep.find({
            select: ['id', 'title', 'img']
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
        Logger.log(id)
        let res = await this.articleRep.findOne(id)
        await this.articleRep.update(id, {
            look_num: res.look_num + 1
        })
        return res
    }

    async findAll(page = 0, size = 10, type_id = 0) {
        if (!type_id) {
            httpRes(ApiErrorCode.NOT_FUND, 'type_id 不存在');
        }
        let res = await this.articleRep.findAndCount({
            order: {
                sort: "DESC",
                create_time: "DESC"
            },
            skip: page * size,
            take: size,
            where: {
                type_id: type_id
            }
        })

        // let res = await this.articleRep.find({
        //     order: {
        //         sort: "DESC",
        //         create_time: "DESC"
        //     },
        //     skip: page * size,
        //     take: size,
        //     where: {
        //         type_id: type_id
        //     }
        // })
        return {
            count: res[1],
            data: res[0],
            type_id: type_id
        }
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


    async home() {
        let allType = await this.getType()
        if (allType && allType.length) {
            let allArtice = await Promise.all(allType.map(obj => this.findAll(0, 5, obj.id)))
            return allArtice.filter(obj => obj.count)
        }
        return []
    }
}