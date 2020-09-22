import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('system_performance')
export class SystemPerformance {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @Column({
    default: null,
    comment: '应用代码'
  })
  app_code: string;


  @Column({
    default: null,
    comment: '页面url'
  })
  page_url: string;

  @Column({
    default: null,
    comment: '准备新页面时间耗时'
  })
  prepare_newpage_time: number;

  @Column({
    default: null,
    comment: 'DNS查询耗时'
  })
  dns_time: number;
  
  @Column({
    default: null,
    comment: 'TCP链接耗时'
  })
  tcp_time: number;

  @Column({
    default: null,
    comment: 'request请求耗时'
  })
  request_time: number;

  @Column({
    default: null,
    comment: '解析dom树耗时'
  })
  analysis_dom_time: number;

  @Column({
    default: null,
    comment: '白屏时间'
  })
  white_screen_time: number;

  @Column({
    default: null,
    comment: 'dom准备时间'
  })
  dom_ready_time: number;

  @Column({
    default: null,
    comment: 'onload执行完成时间'
  })
  onload_success_time: number;

  @Column({
    comment: '页面的加载方式',
    default: null,
  })
  load_type_str: string;

  @Column({
    comment: '页面的加载方式类型',
    default: null,
  })
  load_type: number;
}
