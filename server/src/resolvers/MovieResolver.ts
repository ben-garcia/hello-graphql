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
  UseMiddleware,
} from 'type-graphql';

import { Movie } from '../entity';
import isAuthenticated from '../middleware/isAuthenticated';
import { MyApolloContext } from '../types';

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
  @Field(() => [MovieFieldError], { nullable: true })
  errors?: MovieFieldError[];

  @Field(() => Movie, { nullable: true })
  movie?: Movie;
}

@Resolver()
class MovieResolver {
  @Mutation(() => MovieResponse)
  @UseMiddleware(isAuthenticated)
  async createMovie(
    @Arg('options', () => MovieInput) options: MovieInput,
    @Ctx() { req }: MyApolloContext
  ): Promise<MovieResponse> {
    try {
      const movie = await Movie.create({
        title: options.title,
        url: options.url,
        minutes: options.minutes,
        user: req.session.userId,
      } as any).save();
      return { movie };
    } catch (e) {
      return {
        errors: [
          {
            field: '',
            message: ',error',
          },
        ],
      };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async modifyMovie(
    @Arg('id', () => String) id: string,
    @Arg('options', () => MovieUpdateInput) options: MovieUpdateInput
  ) {
    try {
      await Movie.update({ id }, { ...options });
      return true;
    } catch (e) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteMovie(@Arg('id', () => String) id: string): Promise<boolean> {
    try {
      await Movie.delete({ id });
      return true;
    } catch (_) {
      return false;
    }
  }

  @Query(() => [Movie])
  async movies(): Promise<Movie[]> {
    const movies = await Movie.find({ relations: ['user'] });
    return movies;
  }

  @Query(() => Movie, { nullable: true })
  async movie(
    @Arg('id', () => String!) id: string
  ): Promise<Movie | undefined> {
    try {
      const movie = await Movie.findOne({
        relations: ['user', 'comments', 'comments.user'],
        where: { id },
      });

      movie!.comments.sort((a, b) => {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        return bDate - aDate;
      });

      return movie;
    } catch (e) {
      return undefined;
    }
  }
}

export default MovieResolver;
