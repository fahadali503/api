import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/model/User.model";

@ObjectType()
export class Seller extends User {
    @Field()
    business: string;

    @Field(type => [User], { nullable: true })
    followings?: string[];
}