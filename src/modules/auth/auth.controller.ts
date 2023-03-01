import { LoginUserDto } from './dto/LoginUser.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('register')
    async regUser(@Body()body: RegisterUserDto){
        return await this.authService.registerUser(body)
    }

    @Post('login')
    async login(@Body()body: LoginUserDto){
        return await this.authService.login(body);
    }
}
