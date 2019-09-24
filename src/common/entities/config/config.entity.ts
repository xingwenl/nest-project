import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Config {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    key: string
    
    @Column()
    val: string

    
}