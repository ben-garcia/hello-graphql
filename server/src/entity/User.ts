import {
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import * as argon2 from 'argon2';

import Movie from './Movie';
import Comment from './Comment';

@ObjectType()
@Entity()
class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => [Movie])
  @OneToMany(() => Movie, movie => movie.user, { onDelete: 'CASCADE' })
  movies: Movie[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, comment => comment.user, { onDelete: 'CASCADE' })
  comments: Comment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  hashPassword = async () => {
    try {
      const hashedPassword = await argon2.hash(this.password);
      this.password = hashedPassword;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('failed to hash password before inserting into db: ', e);
    }
  };
}

export default User;
