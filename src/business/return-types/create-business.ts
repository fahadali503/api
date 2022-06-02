import { Field, ObjectType } from "@nestjs/graphql";
import { Business } from "../models/business.model";

@ObjectType({ description: "The return type that will return a message and a business whenever a business will be created." })
export class CreateBusinessReturnType {
    @Field()
    message: string;

    @Field(type => Business)
    business: Business
}