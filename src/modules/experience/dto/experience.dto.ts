import {   IsNotEmpty, IsString } from "class-validator";

export class ExperienceDto {
    @IsString()
    @IsNotEmpty()
    title : string;


    @IsString()
    @IsNotEmpty()
    start_time : Date;

    @IsString()
    @IsNotEmpty()
    end_time : Date;

    @IsString()
    @IsNotEmpty()
    description : string;
}


