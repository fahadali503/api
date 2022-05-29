import { Field, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";

@InputType()
export class SignUpInput {

    @IsString()
    @Field()
    fullName: string;

    @IsString()
    @Field()
    username: string;

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