import { AddTypeDto } from './dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleType } from './../../../common/entities/article/article-type.entity';
import { Article } from './../../../common/entities/article/article.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRep: Repository<Article>,
        @InjectRepository(ArticleType)
        private readonly articleTypeRep: Repository<ArticleType>,
    ){}

    addType(addType: AddTypeDto) {
        return this.articleTypeRep.insert(addType)
    }
    getType() {
        return this.articleTypeRep.find({
            select: ['id', 'title']
        })
    }
}