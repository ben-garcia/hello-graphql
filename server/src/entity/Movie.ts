import {
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Comment, User } from '.';

@ObjectType()
@Entity()
class Movie extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  url: string;

  @Field(() => Int)
  @Column('int', { default: 60 })
  minutes: number;

  @Field(() => [Comment])
  @OneToMany(() => Comment, comment => comment.movie, { onDelete: 'CASCADE' })
  comments: Comment[];

  @Field(() => User)
  @ManyToOne(_ => User, user => user.movies, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Movie;
