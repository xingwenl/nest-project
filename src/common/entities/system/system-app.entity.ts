import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('system_app')
export class SystemApp {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @Column({
    comment: '应用代码'
  })
  app_code: string;

  @Column({
    comment: '应用名称'
  })
  app_name: string;

  @Column({
    comment: '应用版本'
  })
  app_version: string;
}
