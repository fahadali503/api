import { ROLES } from "src/utils/role";
import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Location } from "src/common/models/Location";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
    @Field()
    @prop()
    fullName: string;
    @Field()
    @prop()
    username: string;

    @Field()
    @prop()
    email: string;

    @Field()
    @prop()
    password: string;

    @Field(type => String)
    @prop({ enum: Object.values(ROLES) })
    role: ROLES;

    // For Admin
    @Field(type => Boolean)
    @prop({ type: Boolean, default: false })
    isAccountVerified: boolean;

    // confirm from the email
    @Field(type => Boolean)
    @prop({ type: Boolean, default: false })
    isAccountConfirmed: boolean;

    // upgrade to premium
    @Field(type => Boolean)
    @prop({ type: Boolean, default: false })
    isPremiumAccount: boolean;

    // check if the user is online
    @prop({ type: Boolean, default: false })
    @Field(type => Boolean)
    isOnline: boolean;

    @prop()
    @Field()
    profilePicture: string;

    // last seen of the user
    @prop()
    @Field()
    lastSeen: Date;
    // Favourite Businesses for User

    @prop()
    @Field(type => [String], { nullable: true })
    favourites?: string[];
    // Followings for Business

    @prop()
    @Field(type => [String], { nullable: true })
    followings?: string[];


    @prop()
    @Field(type => String, { nullable: true })
    location: Ref<Location, string>;
}