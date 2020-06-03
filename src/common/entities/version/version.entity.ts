import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../base/base-entity';

@Entity('app_version')
export class Version extends BaseEntity {
  @Column({
    default: 0,
    comment: '0不更新，1有更新但不强制更新,2表示有更新，强制更新',
  })
  update_status: number;

  @Column({
    default: null,
    comment: '编译版本号',
  })
  build_version: number;

  @Column({
    default: null,
    comment: '当前应用的版本号',
  })
  app_version: string;

  @Column({
    default: null,
    comment: '更新的提示内容',
  })
  modify_content: string;

  @Column({
    default: null,
    comment: '文件下载地址',
  })
  download_url: string;

  @Column({
    default: null,
    comment: '文件下载大小，单位kb',
  })
  download_size: string;
}
