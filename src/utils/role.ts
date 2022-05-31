import { registerEnumType } from "@nestjs/graphql";

export enum ROLES {
    CUSTOMER = 'Customer',
    SELLER = 'Seller',
    MARKETER = 'Marketer',
    ADMIN = 'Admin',
    SUPER_ADMIN = 'Super Admin'
}

registerEnumType(ROLES, {
    name: "Roles",
    valuesMap: {
        ADMIN: {
            description: "Admin Role"
        },
        CUSTOMER: {
            description: "Customer Role"
        },
        MARKETER: {
            description: "The Marketer who will help Seller to sale their products."
        },
        SELLER: {
            description: "The Seller who will sale products."
        },
        SUPER_ADMIN: {
            description: "The Super Admin will manage all other roles."
        }
    }
})