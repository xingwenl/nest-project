import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    username: string;

    @Column({
        comment: '状态，0 下架，1 正常',
        default: 1
    })
    status: number;

    @Column({
        comment: '文章类型id'
    })
    type_id: number;
    
    @Column({
        comment: '备注',
    })
    memo: string

    @Column()
    content: string;

    @CreateDateColumn()
    create_time: Date;

    @UpdateDateColumn()
    update_time: Date;

    @Column({
        comment: '是否置顶',
        default: 0
    })
    is_top: number;

    @Column({
        comment: '排序',
        default: 0
    })
    sort: number;

    @Column({
        comment: '查看人数',
        default: 0
    })
    look_num: number;
}