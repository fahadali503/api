import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/model/User.model";

@ObjectType()
export class Auth {
    @Field()
    token: string;
    @Field(type => User)
    user: User
}