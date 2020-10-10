import {
  Arg,
  Ctx,
  Field,
  Mutation,
  InputType,
  Query,
  ObjectType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import * as argon2 from 'argon2';
import { User } from '../entity';
import { MyApolloContext } from '../types';
import isAuthenticated from '../middleware/isAuthenticated';

@InputType()
class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class UserUpdateInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;
}

@ObjectType()
class UserFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [UserFieldError], { nullable: true })
  errors?: UserFieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
class UserResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg('options', () => UserInput) options: UserInput
  ): Promise<Boolean> {
    try {
      await User.create(options).save();
      return true;
    } catch (e) {
      return false;
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options', () => UserInput) options: UserInput,
    @Ctx() { req }: MyApolloContext
  ): Promise<UserResponse> {
    try {
      const user = await User.findOne({ where: { email: options.email } });

      if (!user) {
        return {
          errors: [
            {
              field: 'email',
              message: 'no user wth that email',
            },
          ],
        };
      }

      const isPasswordValid = await argon2.verify(
        user.password,
        options.password
      );

      if (!isPasswordValid) {
        return {
          errors: [
            {
              field: 'password',
              message: 'wrong password',
            },
          ],
        };
      }

      req.session.userId = user.id;
      req.session.userEmail = user.email;

      return { user };
    } catch (e) {
      console.log('error: ', e);
      return {
        errors: [
          {
            field: 'g',
            message: 'error',
          },
        ],
      };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async logout(@Ctx() { req }: MyApolloContext) {
    req.session.destroy(err => {
      console.log('could not destroy session: ', err);
      return false;
    });

    return true;
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg('id', () => String) id: string,
    @Arg('input', () => UserUpdateInput) input: UserUpdateInput
  ): Promise<boolean> {
    await User.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => String) id: string) {
    await User.delete({ id });
    return true;
  }

  @Query(() => [User])
  @UseMiddleware(isAuthenticated)
  users() {
    return User.createQueryBuilder('user')
      .leftJoinAndSelect('user.movies', 'movie')
      .getMany();
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async me(@Ctx() { req }: MyApolloContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    const user = await User.findOne({
      where: { id: req.session.userId },
      relations: ['movies'],
    });
    return user as User;
  }
}

export default UserResolver;
