import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { GqlGuard } from 'src/auth/gql.guard';
import { ROLES } from 'src/utils/role';
import { RoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/roles.decorator';
import { CreateBusinessInput } from './inputs/create-business.input';
import { Business } from './models/business.model';

@UseGuards(GqlGuard)
@Resolver(of => Business)
export class BusinessResolver {

    @UseGuards(RoleGuard)
    @Roles(ROLES.SELLER)
    @Mutation(returns => Business)
    createBusiness(@Args('data', { type: () => CreateBusinessInput }) data: CreateBusinessInput, @Args("businessImage", { type: () => GraphQLUpload }) businessImage: FileUpload) {
        return data
    }

}
