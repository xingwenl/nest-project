import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Storage {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    create_time: Date;

    @UpdateDateColumn()
    update_time: Date;

    @Column({
        comment: '过期时间',
        default: null
    })
    expires?: Date;

    @Column()
    key: string;

    @Column()
    value: string;

    @Column({
        comment: '创建人的id，用户id 或者 特定id'
    })
    creater_id: string;

    @Column({
        comment: '介绍',
        default: null
    })
    intro?: string;
}
