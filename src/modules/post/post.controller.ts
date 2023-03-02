import { Body, Controller, Post, Headers, Param, Get, UseGuards } from '@nestjs/common';
import { PostDto } from './dto/Post.dto';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators/user.decorator';
import { UserDto } from 'src/decorators/dto/user.decorator.dto';
import { post} from 'src/models/post.schema';

@Controller('post')
export class PostController {
    constructor(private readonly postService : PostService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body:PostDto,@User() user:UserDto): Promise<post> {
        return await this.postService.create(body,user._id);
    }


    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAllPostBySpecificUser(@User() user:UserDto):Promise<PostDto[]>{
        return this.postService.getAllPostByUser(user);
    }
}
