import { UploadRecords } from './upload/upload-records.entity';
import { Userinfo } from "./user/user-info.entity";
import { UserRecord } from "./user/user-record.entity";
import { Article } from "./article/article.entity";
import { ArticleType } from "./article/article-type.entity";
import { TypeOrmModule } from '@nestjs/typeorm';


export const Entities = [
    Userinfo,
    UserRecord,
    Article,
    ArticleType,
    UploadRecords
]

export const EntitiesModule = TypeOrmModule.forFeature([
    ...Entities
])