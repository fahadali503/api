import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { SignUpInput } from './args-types/sign-up.args';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { User } from './model/User.model';
import { UserService } from './user.service';


@Resolver(type => User)
export class UserResolver {

    constructor(private readonly UserService: UserService) { }

    @Query(returns => String)
    getName() {
        return 'Hello World'
    }
    @Mutation(returns => String)
    signUp(@Args('data') data: SignUpInput, @Args('profilePicture', { type: () => GraphQLUpload }) profilePicture: FileUpload) {
        return this.UserService.createUser(data, profilePicture);
    }
}
