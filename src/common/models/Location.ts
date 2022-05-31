import { Field, ObjectType } from "@nestjs/graphql";
import { modelOptions, prop } from "@typegoose/typegoose";

@ObjectType()
class Coordinate {
    @Field(type => Number)
    accuracy: number;

    @Field(type => Number, { nullable: true })
    altitude: number | null;

    @Field(type => Number, { nullable: true })
    altitudeAccuracy: number | null;

    @Field(type => Number, { nullable: true })
    heading: number | null;

    @Field(type => Number)
    latitude: number;

    @Field(type => Number)
    longitude: number

    @Field(type => Number, { nullable: true })
    speed: number | null
}

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class Location {
    @Field(type => Coordinate)
    @prop()
    coords: Coordinate;

    @Field(type => Number)
    @prop()
    timestamp: number
}