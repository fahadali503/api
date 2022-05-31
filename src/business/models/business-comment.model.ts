import { Field, ObjectType } from "@nestjs/graphql";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "src/user/model/User.model";
import { Business } from "./business.model";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class BusinessComment {
    @Field(type => Business)
    @prop({ type: String, ref: () => Business })
    businessId: Ref<Business, string>;

    @Field(type => User)
    @prop({ type: String, ref: () => User })
    businessOwnerId: Ref<User, string>;


    @Field(type => User)
    @prop({ type: String, ref: () => User })
    commentorId: Ref<User, string>;

    @Field()
    @prop()
    comment: string;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;

}