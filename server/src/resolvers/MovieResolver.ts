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

  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

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
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
  ) {
    await Movie.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
	@UseMiddleware(isAuthenticated)
  async deleteMovie(@Arg("id", () => Int) id: number) {
    await Movie.delete({ id });
    return true;
  }

  @Query(() => [Movie])
  movies() {
    return Movie
						.createQueryBuilder('movie')
						.leftJoinAndSelect('movie.user', 'user')
						.getMany();
  }
}
