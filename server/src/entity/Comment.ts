import {
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import Movie from './Movie';
import User from './User';

@ObjectType()
@Entity()
class Comment extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  content: string;

  @Field(() => Movie)
  @ManyToOne(() => Movie, movie => movie.comments, { onDelete: 'CASCADE' })
  movie: Movie;

  @Field(() => User)
  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Comment;
