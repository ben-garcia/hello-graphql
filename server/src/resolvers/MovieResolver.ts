import {
  Arg,
	Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
	ObjectType,
  Resolver,
	UseMiddleware
} from "type-graphql";

import { Movie } from "../entity/Movie";
import isAuthenticated from "../middleware/isAuthenticated";
import {  MyApolloContext } from '../types';

@InputType()
class MovieInput {
  @Field()
  title: string;

	@Field()
	url: string;

  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

	@Field(() => String, { nullable: true })
	url?: string;

  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@ObjectType()
class MovieFieldError {
	@Field()
	field: string;
	
	@Field()
	message: string;
}

@ObjectType()
class MovieResponse {
	@Field(() => [MovieFieldError], { nullable: true } )
	errors?: MovieFieldError[];

	@Field(() => Movie, { nullable: true })
	movie?: Movie;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => MovieResponse)
	@UseMiddleware(isAuthenticated)
  async createMovie(
		@Arg("options", () => MovieInput) options: MovieInput,
		@Ctx() { req }: MyApolloContext
	): Promise<MovieResponse> {
		try {
			const movie = await Movie.create({
				title: options.title,
				url: options.url,
				minutes: options.minutes,
				user: req.session.userId
			} as any).save();
			return { movie } ;
		} catch (e) {
			return {
				errors: [
					{
						field: '',
						message: ',error',
					}
				]
			}
		}
  }

  @Mutation(() => Boolean)
	@UseMiddleware(isAuthenticated)
  async modifyMovie(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => MovieUpdateInput) options: MovieUpdateInput
  ) {
		try {
			await Movie.update({ id }, {...options});
			return true;
		} catch (e) {
			return false; 
		}
  }

  @Mutation(() => Boolean)
	@UseMiddleware(isAuthenticated)
  async deleteMovie(@Arg("id", () => Int) id: number): Promise<boolean> {
		try {
			await Movie.delete({ id });
			return true;
		} catch (_) {
			return false;
		}
  }

  @Query(() => [Movie])
	movies(): Promise<Movie[]> {
    return Movie
						.createQueryBuilder('movie')
						.leftJoinAndSelect('movie.user', 'user')
						.getMany();
  }

	@Query(() => Movie, { nullable: true })
	async movie(@Arg("id", () => Int!) id: number): Promise<Movie | undefined> {
		try {
		const movie = await Movie.findOne({ relations: ['user'], where: { id } });
			return movie;
		} catch (e) {
			return undefined;
		}
	}
}
