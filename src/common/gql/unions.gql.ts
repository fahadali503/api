import { createUnionType } from "@nestjs/graphql";
import { Customer } from "src/customer/customer.schema";
import { Marketer } from "src/marketer/marketer.model";
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
});


export const RolesUnionType = createUnionType({
    name: "RolesUnionType",
    types() {
        return [Customer, Seller, Marketer]
    },
    description: "The Roles Union Type is basic interface that will differentiate between who just have queried.",
    resolveType(value: User) {
        if (value.role === ROLES.CUSTOMER) {
            return Customer;
        }
        if (value.role === ROLES.MARKETER) {
            return Marketer;
        }
        if (value.role === ROLES.SELLER) {
            return Seller
        }
        return null;
    }
})