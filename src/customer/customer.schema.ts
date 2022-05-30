import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/model/User.model";

@ObjectType()
export class Customer extends User {
    @Field(type => [String], { nullable: true })
    favourites?: string[];
}