import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/LoginUser.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Developer } from 'src/models/developer.schema';
import { User } from 'src/decorators/user.decorator';
import { UserDto } from 'src/decorators/dto/user.decorator.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('register')
    async registerUser(@Body()body: RegisterUserDto): Promise<{ user: Partial<Developer>; accessToken: string; }>{
        return await this.authService.registerUser(body)
    }

    @Post('login')
    async login(@Body()body: LoginUserDto): Promise<{ accessToken: string; }>{
        return await this.authService.login(body);
    }

}
