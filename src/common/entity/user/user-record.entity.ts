import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_record')
export class UserRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    pwd: string;

    @Column()
    age: number;
}
