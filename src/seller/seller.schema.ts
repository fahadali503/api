import { Field, ObjectType } from "@nestjs/graphql";
import { Business } from "src/business/models/business.model";
import { User } from "src/user/model/User.model";

@ObjectType()
export class Seller extends User {
    @Field(type => [Business])
    business: string[];

    @Field(type => [User])
    followings?: string[];
}