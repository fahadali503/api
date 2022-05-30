import { Query, Resolver } from '@nestjs/graphql';
import { Customer } from './customer.schema';

@Resolver(type => Customer)
export class CustomerResolver {
    @Query(returns => Customer)
    getCustomer() {
        return {
            favourites: []
        }
    }
}
