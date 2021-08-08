import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  body: string;

  @Column()
  createdAt: Date;
}
