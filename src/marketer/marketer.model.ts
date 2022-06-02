import { Field, ObjectType } from "@nestjs/graphql";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Seller } from "src/seller/seller.schema";
import { User } from "src/user/model/User.model";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class Marketer extends User {

    @Field(type => [Seller])
    @prop({ type: String, ref: () => User })
    sellers: Ref<User, string>;
}