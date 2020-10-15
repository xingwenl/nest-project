import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  username: string;

  @Column({
    comment: '用户id',
  })
  user_id: number;

  @Column({
    comment: '状态，0 下架，1 正常',
    default: 1,
  })
  status: number;

  @Column({
    comment: '文章类型id',
  })
  type_id: number;

  @Column({
    comment: '标签id',
    default: null,
  })
  label_id: number;

  @Column({
    comment: '备注',
    default: null,
  })
  memo: string;

  @Column({
    comment: 'md的内容',
    type: 'text',
    length: 0,
    charset: 'utf8',
  })
  content: string;

  @Column({
    comment: 'html的内容',
    type: 'text',
    length: 0,
    charset: 'utf8',
  })
  render_content: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @Column({
    comment: '是否置顶',
    default: 0,
  })
  is_top: number;

  @Column({
    comment: '排序',
    default: 0,
  })
  sort: number;

  @Column({
    comment: '查看人数',
    default: 0,
  })
  look_num: number;

  @Column({
    comment: '评论数',
    default: 0,
  })
  reply_num: number;
}
