import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Tweet } from '../tweet/tweet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => Tweet, (tweet) => tweet.user, { eager: true })
  tweets: Tweet[];

  //   @ManyToMany((type) => User, (user) => user.id)
  //   @JoinTable()
  //   following: User[];

  //   @OneToMany((type) => User, (user) => user.followers, { cascade: true })
  //   following: User[];

  //   @ManyToOne((type) => User, (user) => user.following)
  //   followers: User[];
}
