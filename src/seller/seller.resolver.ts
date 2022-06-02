import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlGuard } from 'src/auth/gql.guard';
import { ROLES } from 'src/utils/role';
import { RoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/roles.decorator';
import { Seller } from './seller.schema';
import { SellerService } from './seller.service';

@UseGuards(GqlGuard, RoleGuard)
@Resolver(of => Seller)
export class SellerResolver {
    constructor(
        private readonly SellerService: SellerService,
    ) { }

    // Field Resolver for Business
    @Roles(ROLES.SELLER)
    @ResolveField()
    business(@Parent() seller: Seller) {
        return this.SellerService.findBusiness(seller._id);
    }

    @Roles(ROLES.SELLER)
    @ResolveField()
    followings(@Parent() parent: Seller) {
        return this.SellerService.findFollowings(parent._id)
    }
}
