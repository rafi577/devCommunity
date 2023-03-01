import { IsNotEmpty, IsString, MinLength, } from "class-validator";
export class CreatePostDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    description : string;
}
