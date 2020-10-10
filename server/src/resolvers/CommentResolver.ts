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

  @Mutation(() => CommentResponse)
  @UseMiddleware(isAuthenticated)
  async modifyComment(
    @Arg('id', () => String) id: string,
    @Arg('content', () => String) content: string,
    @Ctx() { req }: MyApolloContext
  ): Promise<CommentResponse> {
    try {
      const updatedResult = await Comment.createQueryBuilder()
        .update()
        .set({ content })
        .where('id = :id', { id })
        .returning('*')
        .execute();

      return {
        comment: {
          ...updatedResult.raw[0],
          user: { email: req.session.userEmail },
        },
      };
    } catch (e) {
      return {
        errors: [
          {
            field: 'content',
            message: 'failed to updated',
          },
        ],
      };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteComment(@Arg('id', () => String) id: number): Promise<boolean> {
    try {
      await Comment.createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export default CommentResolver;
