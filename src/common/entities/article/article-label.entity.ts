import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ArticleLabel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;
}
