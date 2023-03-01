import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { level } from "./skill.dto";


export class UpdateSkillDto{
    // @IsString()
    // @IsNotEmpty()
    // name : string;

    @IsNumber()
    level : level;
}
