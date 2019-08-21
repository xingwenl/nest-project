import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user_roles')
export class UserRoles {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string
}