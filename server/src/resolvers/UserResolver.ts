import {
	Resolver,
	Mutation,
	Arg,
	Int,
	Query,
	InputType,
	Field,
} from 'type-graphql';
import { User } from '../entity/User';

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

@Resolver()
export class UserResolver  {
	@Mutation(() => Boolean)
	async register(@Arg('options', () => UserInput) options: UserInput) {
		try {
			await User.create(options).save();
			return true;
		} catch (e) {
			return false;
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
	users() {
		return User
						.createQueryBuilder('user')
						.leftJoinAndSelect('user.movies', 'movie')
						.getMany();
	}
}
