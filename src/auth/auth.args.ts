import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@ArgsType()
export class LoginArgs {
    @Field()
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Field()
    password: string;
}