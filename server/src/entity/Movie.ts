import { OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from '../entity/User';
import { Comment } from '../entity/Comment';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

	@Field()
	@Column()
	url: string;

  @Field(() => Int)
  @Column("int", { default: 60 })
  minutes: number;

	@Field(() => [Comment])
	@OneToMany(() => Comment, comment => comment.movie, { onDelete: 'CASCADE' })
	comments: Comment[];

	@Field(() => User)
	@ManyToOne(_ => User, user => user.movies, { onDelete: 'CASCADE'})
	user: User;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;	

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;	
}
