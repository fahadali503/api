import { Args, Mutation, Query, } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { SignUpInput } from './args-types/sign-up.args';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { User } from './model/User.model';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { IJwtPayload } from 'src/utils/types';
import { UseGuards } from '@nestjs/common';
import { GqlGuard } from 'src/auth/gql.guard';
import { Public } from 'src/auth/public.decorator';
import { Customer } from 'src/customer/customer.schema';
import { Seller } from 'src/seller/seller.schema';
import { MeUnionResult } from 'src/common/gql/unions.gql';


@UseGuards(GqlGuard)
@Resolver(of => User)
export class UserResolver {
    constructor(private readonly UserService: UserService) { }

    @Public()
    @Mutation(returns => String)
    signUp(@Args('data') data: SignUpInput,
        @Args('profilePicture', { type: () => GraphQLUpload })
        profilePicture: FileUpload): Promise<string> {
        return this.UserService.createUser(data, profilePicture);
    }

    @Query(type => MeUnionResult, { nullable: true })
    me(@CurrentUser() user: IJwtPayload): Promise<User> {
        return this.UserService.findUserById(user._id)
    }

}
