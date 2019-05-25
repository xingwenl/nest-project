import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('upload_records')
export class UploadRecords {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number

    @CreateDateColumn()
    create_time: Date

    @Column()
    path: string

    @Column()
    type: string
}