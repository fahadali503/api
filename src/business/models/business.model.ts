import { Field, ObjectType } from "@nestjs/graphql";
import { modelOptions, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Location } from "src/common/models/Location";
import { BusinessReview } from "src/common/models/Review.model";
import { User } from "src/user/model/User.model";
import { BusinessComment } from "./business-comment.model";

@ObjectType({ description: "Business Schema for Seller" })
@modelOptions({ schemaOptions: { timestamps: true } })
export class Business {

    @Field(type => User)
    @prop({ type: String, ref: () => User })
    ownerId: Ref<User, string>;

    @Field()
    @prop()
    businessName: string;

    @Field()
    @prop()
    businessDescription: string;

    @Field()
    @prop()
    businessImage: string;

    @Field()
    @prop()
    businessEmail: string;

    // Will be decided later
    // @prop()
    // @Field()
    // businessType: string;

    @prop()
    @Field()
    ownerName: string;

    @prop()
    @Field()
    ownerCNIC: string;

    @prop()
    @Field()
    businessPhone: string;


    // For right now, this will be nullable
    @Field(type => Location, { nullable: true })
    @prop({ type: String, ref: () => Location })
    location: Ref<Location, string>;

    @prop()
    @Field()
    experience: string;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;

    @Field(type => [String])
    @prop({ type: Number })
    offDays: mongoose.Types.Array<number>;

    // The business favourite by the customers
    @Field(type => [User])
    @prop({ ref: () => User, type: String })
    favourites: Ref<User, string>[];

    // Business Likes
    @Field(type => [User])
    @prop({ ref: () => User, type: String })
    likes: Ref<User, string>[]

    // Business Reviews
    @Field(type => [BusinessReview], { description: "Reviews of the Business." })
    @prop({ type: String, ref: () => BusinessReview })
    reviews: Ref<BusinessReview, string>[];


    @Field(type => [BusinessComment])
    @prop({ type: String, ref: () => BusinessComment })
    comments: Ref<BusinessComment, string>[];

    @Field()
    @prop()
    closingTime: string;

    @Field()
    @prop()
    openingTime: string;
}


export interface IBusiness extends Pick<Business, keyof Business> { }