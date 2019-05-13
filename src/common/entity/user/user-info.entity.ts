import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_info')
export class Userinfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    pwd: string;

    @Column()
    age: number;
}

