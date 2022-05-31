import { Field, ObjectType } from "@nestjs/graphql";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Business } from "src/business/models/business.model";
import { User } from "src/user/model/User.model";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class BusinessReview {
    @Field()
    _id: string;

    @Field(type => User, { description: "The User who will review the Business." })
    @prop({ type: String, ref: () => User })
    reviewerId: Ref<User, string>

    @Field(type => Business, { description: "The Business that will get review." })
    @prop({ type: String, ref: () => Business })
    businesId: Ref<Business, string>

    @Field(type => Number)
    @prop({ type: Number })
    review: number

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;
}