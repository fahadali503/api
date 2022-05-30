import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MinLength } from "class-validator";

@InputType()
export class SignUpInput {

    @IsString()
    @Field()
    fullName: string;

    @IsString()
    @Field()
    username: string;

    @IsEmail()
    @IsString()
    @Field()
    email: string;

    @MinLength(8)
    @IsString()
    @Field()
    password: string;

    @IsString()
    @Field()
    role: string;
}