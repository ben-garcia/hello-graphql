import { CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Movie } from "../entity/Movie";
import { User } from "../entity/User";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

	@Field()
	@Column('text')
	content: string;

	@Field(() => Movie)
	@ManyToOne(() => Movie, movie => movie.comments, { onDelete: 'CASCADE'})
	movie: Movie;

	@Field(() => User)
	@ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE'})
	user: User;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;	

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;	
}
