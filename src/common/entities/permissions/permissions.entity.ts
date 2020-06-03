import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('permissions')
export class PermissionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('simple-array')
  roles: string[] = [];

  @Column({
    comment: '匹配规则 ，正则表达式',
  })
  reg: string;

  @Column({
    comment: '谁设置的',
  })
  user_id: number;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
