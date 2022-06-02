import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";


@InputType()
export class EditBusinessInput {
    @Field(type => String, { nullable: true })
    @IsOptional()
    @IsString()
    businessName: string;

    @Field(type => String, { nullable: true })
    @IsOptional()
    @IsString()
    businessDescription: string;

    @Field(type => String, { nullable: true })
    @IsOptional()
    @IsEmail()
    @IsString()
    businessEmail: string;

    // Will be decided later
    // @Field(type => String)
    // @IsString()
    // businessType: string;

    @Field(type => String, { nullable: true })
    @IsOptional()
    @IsString()
    ownerName: string;

    @Field(type => String, { nullable: true })
    @IsOptional()
    @IsString()
    ownerCNIC: string;

    @Field(type => String, { nullable: true })
    @IsOptional()
    @IsString()
    businessPhone: string;

    @Field(type => String, { nullable: true })
    @IsOptional()
    @IsString()
    experience: string;

    @Field(type => String, { nullable: true })
    @IsOptional()
    @IsNumber({}, { each: true })
    offDays: number[];

    @Field(type => String, { nullable: true })
    @IsOptional()
    @IsString()
    closingTime: string;

    @Field(type => String, { nullable: true })
    @IsOptional()
    @IsString()
    openingTime: string;

}