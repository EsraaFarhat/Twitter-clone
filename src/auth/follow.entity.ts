import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany((type) => User)
  user: User;

  @ManyToMany((type) => User)
  following: User;
}
