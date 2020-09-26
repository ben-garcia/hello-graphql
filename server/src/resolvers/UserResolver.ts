import {
	Arg,
	Ctx,
	Field,
	Mutation,
	InputType,
	Int,
	Query,
	ObjectType,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { User } from '../entity/User';
import { MyApolloContext } from '../types';
import * as argon2 from 'argon2';
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
	email?: string

	@Field(() => String, { nullable: true })
	password?: string
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
export class UserResolver {
	@Mutation(() => Boolean)
	async register(
		@Arg('options', () => UserInput) options: UserInput): Promise<Boolean> {
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
	): Promise<UserResponse>{
		try {
			const user = await User.findOne({ where: { email: options.email }})

			if (!user) {
				return {
					errors: [
						{
							field: 'email',
							message: 'no user wth that email'
						}
					]
				}
			}

			const isPasswordValid = await argon2.verify(user.password, options.password);  

			if (!isPasswordValid) {
				return {
					errors: [
						{
							field: 'password',
							message: 'wrong password',
						}
					]
				};
			}

			req.session.userId = user.id;

			return { user };

		} catch (e) {
			console.log('error: ', e);
			return {
				errors: [
					{ 
						field: 'g',
						message: 'error',
					}
				]
			}	
		}
	}

	@Mutation(() => Boolean)
	async updateUser(
		@Arg('id', () => Int) id: number,
		@Arg('input', () => UserUpdateInput) input: UserUpdateInput
	) {
		await User.update({ id }, input);
		return true;
	}

	@Mutation(() => Boolean)
	async deleteUser(@Arg('id', () => Int) id: number) {
		await User.delete({ id });
		return true;
	}

	@Query(() => [User])
	@UseMiddleware(isAuthenticated)
	users() {
		return User
						.createQueryBuilder('user')
						.leftJoinAndSelect('user.movies', 'movie')
						.getMany();
	}

	@Query(() => User, { nullable: true })
	@UseMiddleware(isAuthenticated)
	async me(
		@Ctx() { req }: MyApolloContext
	): Promise<User | null> {
		if (!req.session.userId) {
			return null;
		}
		const user = await User.findOne(req.session.userId);
		return user as User;
	}
}
