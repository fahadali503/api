import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsEmail, IsNumber, IsString } from "class-validator";
import { FileUpload, GraphQLUpload } from "graphql-upload";


@InputType({ description: "The Input Type for the Creation of the Business" })
export class CreateBusinessInput {
    @Field(type => String)
    @IsString()
    businessName: string;

    @Field(type => String)
    @IsString()
    businessDescription: string;

    @Field(type => String)
    @IsEmail()
    @IsString()
    businessEmail: string;

    // Will be decided later
    // @Field(type => String)
    // @IsString()
    // businessType: string;

    @Field(type => String)
    @IsString()
    ownerName: string;

    @Field(type => String)
    @IsString()
    ownerCNIC: string;

    @Field(type => String)
    @IsString()
    businessPhone: string;

    @Field(type => String)
    @IsString()
    experience: string;

    @Field(type => [Number])
    @IsNumber({}, { each: true })
    offDays: number[];

    @Field(type => String)
    @IsString()
    closingTime: string;

    @Field(type => String)
    @IsString()
    openingTime: string;
}