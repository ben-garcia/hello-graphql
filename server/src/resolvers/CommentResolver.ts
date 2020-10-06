import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

import { Comment, User } from '../entity';
import isAuthenticated from '../middleware/isAuthenticated';
import { MyApolloContext } from '../types';

@InputType()
class CommentInput {
  @Field()
  content: string;

  @Field(() => String)
  movieId: string;
}

@ObjectType()
class CommentFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class CommentResponse {
  @Field(() => [CommentFieldError], { nullable: true })
  errors?: CommentFieldError[];

  @Field(() => Comment, { nullable: true })
  comment?: Comment;
}

@Resolver()
class CommentResolver {
  @Mutation(() => CommentResponse)
  @UseMiddleware(isAuthenticated)
  async createComment(
    @Arg('options', () => CommentInput) options: CommentInput,
    @Ctx() { req }: MyApolloContext
  ): Promise<CommentResponse> {
    try {
      const user = await User.findOne(req.session.userId);
      const comment = await Comment.create({
        content: options.content,
        movie: options.movieId,
        user: req.session.userId,
      } as any).save();

      comment.user = user as User;

      return { comment };
    } catch (e) {
      return {
        errors: [
          {
            field: '',
            message: e.message,
          },
        ],
      };
    }
  }
}

export default CommentResolver;
