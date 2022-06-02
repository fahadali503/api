import { Field, ObjectType } from "@nestjs/graphql";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "src/user/model/User.model";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true }, options: { customName: "Image" } })
export class ImageModel {
    @Field()
    _id: string;

    @prop({ type: Number })
    @Field()
    width: number;

    @prop({ type: Number })
    @Field()
    height: number;

    @Field()
    @prop()
    format: string;

    @Field()
    @prop()
    resource_type: string;

    @Field()
    @prop({ type: Number })
    bytes: number;

    @Field()
    @prop()
    url: string;

    @prop()
    secure_url: string;

    @Field()
    @prop()
    folder: string;

    @Field()
    @prop()
    original_filename: string;

    @Field()
    @prop()
    asset_id: string;

    @Field(type => User)
    @prop({ type: String })
    userId: Ref<User, string>

    @Field()
    createdAt: string

    @Field()
    updatedAt: string
}