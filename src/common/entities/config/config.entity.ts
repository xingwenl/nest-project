import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  key: string;

  @Column()
  val: string;
}
