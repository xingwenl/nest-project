// import { TypeOrmModule } from "@nestjs/typeorm";
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
