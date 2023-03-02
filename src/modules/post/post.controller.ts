import { Body, Controller, Post, Headers, Param, Get, UseGuards } from '@nestjs/common';
import { PostDto } from './dto/Post.dto';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators/user.decorator';

@Controller('post')
export class PostController {
    constructor(private readonly postService : PostService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body:PostDto,@User() user): Promise<PostDto> {
        return await this.postService.create(body,user._id);
    }


    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getAllPostBySpecificUser(@Param('id') id : string, @User() user):Promise<PostDto[]>{
        return this.postService.getAllPostByUser(id, user);
    }
}
