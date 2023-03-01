import { IsNotEmpty, IsString, MinLength, } from "class-validator";



export class RegisterUserDto{
    @IsNotEmpty()
    @IsString()
    phone : string;

    @IsNotEmpty()
    @IsString()
    fname: string;

    @IsNotEmpty()
    @IsString()
    lname: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}



