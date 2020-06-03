import { Module, Global } from '@nestjs/common';
import { EntitiesModule } from './entities';
import { DbModule } from './db';
import { ConfigService } from '../module/config/config.service';

import { MulterModule } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { formatDate } from '../utils';
import { Request } from 'express';
@Global()
@Module({
  imports: [
    DbModule,
    EntitiesModule,
    MulterModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        // dest: configService.uploadDest,
        storage: diskStorage({
          // 设置上传后文件路径，uploads文件夹会自动创建。
          destination: (req: Request, file, cb) => {
            const { filename = '' } = req.query;
            cb(null, `${configService.uploadDest}/${filename}`);
          },
          // 给上传文件重命名，获取添加后缀名，
          filename: function(req, file, cb) {
            const fileFormat = file.originalname.split('.');
            cb(null, `${formatDate()}.${fileFormat.pop()}`);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CommonModule {}
