import { ExceptionsHelper } from './../../helpers/Exceptions.helper';
import { LoginUserDto } from './dto/LoginUser.dto';
import { Developer, DeveloperDocument } from './../../models/developer.schema';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import * as bcrypt from "bcrypt";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
   constructor(
    @InjectModel(Developer.name) private developerModel: Model<DeveloperDocument>,
    private readonly jwtService : JwtService
   ){}

   async registerUser(body: RegisterUserDto): Promise<Partial<Developer> | object> {//Promise<Partial<Developer>>
        //? make password hashed
        const hashedPassword = await this.getHashedPass(body?.password);

        //? construct user object
        const userToCreate = this.constructDataAndValidateObject(body,hashedPassword);

        //todo insert user in db
        try{
            const user = await this.developerModel.create(userToCreate)
            if(user){
                const payload = {
                    email:user.email,
                    id: user._id
                };
                const accessToken = this.jwtService.sign(payload);
                delete user['_doc']['password'];
                return {
                    user : user,
                    accessToken: accessToken
                }
            }
        }catch(error){
            ExceptionsHelper.DuplicateException(error,'email')
        }
   }
   //construct data and validation objects
   async constructDataAndValidateObject(body:RegisterUserDto , hasPass:string): Promise<RegisterUserDto>{
        const userToCreate = {
            fname: body.fname ? body.fname : '',
            lname: body.lname ? body.lname : '',
            email:body.email ? body.email : '',
            phone: body.phone ? body.phone : '-',
            password: hasPass
        }
        return userToCreate;
   }


   async login(body:LoginUserDto):Promise<any>{
        const {email, password} = body;
        const developer = await this.developerModel.findOne({email: email});
        const isPasswordMatch = await bcrypt.compare(password, developer.password);
        if(developer && isPasswordMatch){
            const payload = {
                email,
                id: developer._id
            };
            const accessToken = this.jwtService.sign(payload);
            return {accessToken: accessToken};
        }
        else{
            throw new NotFoundException('Not Founded', 
            { 
                cause: new Error(), 
                description: 'User not found' 
            })
        }
    }

    private async getHashedPass(pass: string): Promise<string> {
        const hashedPassword =  bcrypt.hash(pass, 10)
        return hashedPassword;
    }


    async getDeveloper(id):Promise<Developer>{
        const developer = await this.developerModel.findById(id);
        return developer;
    }

}
