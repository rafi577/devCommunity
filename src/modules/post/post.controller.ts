import { Body, Controller, Post,Headers, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body:CreatePostDto,@Headers('authorization') bearerToken: string){
        return body;
    }
}
