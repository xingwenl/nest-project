import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('article_type')
export class ArticleType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    title: string;


    @Column()
    img: string;

    @CreateDateColumn()
    create_time: Date;

    @UpdateDateColumn()
    update_time: Date;
}