import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
	ObjectType,
  Resolver,
} from "type-graphql";
import { Movie } from "../entity/Movie";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  minutes: number;

	@Field(() => Int)
	user: number;
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
  async createMovie(@Arg("options", () => MovieInput) options: MovieInput): Promise<MovieResponse> {
		try {
			const movie = await Movie.create(options as any).save();
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
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
  ) {
    await Movie.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
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
