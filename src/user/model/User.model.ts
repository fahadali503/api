import { ROLES } from "src/utils/role";
import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Location } from "src/common/models/Location";
import { Field, ObjectType } from "@nestjs/graphql";
import { Image } from "src/common/models/Image";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
    @Field()
    _id: string;

    @Field()
    @prop()
    fullName: string;

    @Field()
    @prop()
    username: string;

    @Field()
    @prop()
    email: string;

    @prop()
    password: string;

    @Field(type => ROLES)
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

    @Field(type => Image, { nullable: true })
    @prop({ type: String })
    imageId: Ref<Image, string>;

    @prop()
    @Field()
    profilePicture: string;

    // last seen of the user
    @prop()
    @Field()
    lastSeen: Date;
    // Favourite Businesses for User

    @prop()
    favourites?: string[];
    // Followings for Business

    // If admin blocked the User
    @Field(type => Boolean)
    @prop({ default: false })
    blocked: boolean

    // Users list blocked by the user
    @prop({ type: String, default: [] })
    blockedUsers: Ref<User, string>[]

    @prop()
    followings?: string[];


    @prop()
    @Field(type => Location, { nullable: true })
    location: Ref<Location, string>;


    @Field()
    createdAt: string;

    @Field()
    updatedAt: string
}