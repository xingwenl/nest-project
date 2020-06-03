import { PermissionsEntity } from './permissions/permissions.entity';
import { Storage } from './storage/storage.entity';
import { UploadRecords } from './upload/upload-records.entity';
import { Userinfo } from './user/user-info.entity';
import { UserRecord } from './user/user-record.entity';
import { Article } from './article/article.entity';
import { ArticleType } from './article/article-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config/config.entity';

export const Entities = [
  Userinfo,
  UserRecord,
  Article,
  ArticleType,
  UploadRecords,
  Config,
  Storage,
  PermissionsEntity,
];

export const EntitiesModule = TypeOrmModule.forFeature([...Entities]);
