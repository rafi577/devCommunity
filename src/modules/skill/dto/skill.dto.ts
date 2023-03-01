import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export enum level{
    ONE=1,
    TWO=2,
    THREE=3,
    FOUR=4,
    FIVE=5,
}


export class SkillDto{
    @IsString()
    @IsNotEmpty()
    name : string;

    @IsEnum(level)
    level : number;

}
