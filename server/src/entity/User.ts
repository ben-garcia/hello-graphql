import { OneToMany, BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ObjectType, Int } from 'type-graphql';
import { Movie } from '../entity/Movie';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

	@Field()
  @Column()
  firstName: string;

	@Field()
  @Column()
  lastName: string;

	@Field(() => Int)
  @Column()
  age: number;

	@Field(() => [Movie])
	@OneToMany(() => Movie, movie => movie.user, { onDelete: 'CASCADE' })
	movies: Movie[];
}
