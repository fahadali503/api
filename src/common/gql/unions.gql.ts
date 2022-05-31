import { createUnionType } from "@nestjs/graphql";
import { Customer } from "src/customer/customer.schema";
import { Seller } from "src/seller/seller.schema";
import { User } from "src/user/model/User.model";
import { ROLES } from "src/utils/role";

export const MeUnionResult = createUnionType({
    name: "MeUnionResult",
    types() {
        return [Customer, Seller] as const;
    },
    description: "When the User will logs in, it will either return seller details or customer details",
    resolveType(value: User) {
        console.log(value)
        if (value.role === ROLES.SELLER) {
            return Seller;
        }
        return Customer;
    }
})