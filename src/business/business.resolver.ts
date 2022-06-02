import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { GqlGuard } from 'src/auth/gql.guard';
import { ROLES } from 'src/utils/role';
import { RoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/roles.decorator';
import { IJwtPayload } from 'src/utils/types';
import { BusinessService } from './business.service';
import { CreateBusinessInput } from './inputs/create-business.input';
import { EditBusinessInput } from './inputs/edit-business.input';
import { Business } from './models/business.model';
import { CreateBusinessReturnType } from './schema-types/create-business';

@UseGuards(GqlGuard)
@Resolver(of => Business)
export class BusinessResolver {
    constructor(
        private readonly BusinessService: BusinessService
    ) { }


    // Find Business Query
    @Query(returns => Business, { nullable: true, description: "Find Business By ID" })
    findBusiness(@Args("businessId") id: string): Promise<Business> {
        return this.BusinessService.findBusinessById(id);
    }

    // Create Business mutation
    @UseGuards(RoleGuard)
    @Roles(ROLES.SELLER)
    @Mutation(returns => CreateBusinessReturnType)
    createBusiness(@Args('data', { type: () => CreateBusinessInput }) data: CreateBusinessInput, @Args("businessImage", { type: () => GraphQLUpload }) businessImage: FileUpload, @CurrentUser() user: IJwtPayload): Promise<CreateBusinessReturnType> {
        return this.BusinessService.create(data, businessImage, user._id)
    }


    // Edit Business
    @Roles(ROLES.SELLER)
    @UseGuards(RoleGuard)
    @Mutation(returns => CreateBusinessReturnType)
    editBusiness(@Args("businessId") id: string, @Args('data') data: EditBusinessInput, @CurrentUser() user: IJwtPayload): Promise<CreateBusinessReturnType> {
        return this.BusinessService.editBusiness(id, data)
    }

    @Roles(ROLES.SELLER)
    @UseGuards(RoleGuard)
    @Mutation(returns => String, { description: "Delete business by id" })
    deleteBusiness(@Args("businessId") id: string): Promise<string> {
        return this.BusinessService.deleteBusinessById(id);
    }
}
