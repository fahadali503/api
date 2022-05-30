import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/model/User.model';
import { IJwtPayload, ILogin } from 'src/utils/types';
import { LoginArgs } from './auth.args';
import { Auth } from './auth.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user-decorator';
import { GqlGuard } from './gql.guard';

@Resolver(type => Auth)
export class AuthResolver {
    constructor(
        private readonly AuthService: AuthService
    ) { }

    @Query(returns => Auth)
    login(@Args() data: LoginArgs): Promise<ILogin> {
        return this.AuthService.login(data)
    }


}
