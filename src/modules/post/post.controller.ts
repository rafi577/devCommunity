import { Body, Controller, Post, Headers, Param, Get, UseGuards } from '@nestjs/common';
import { PostDto } from './dto/Post.dto';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
    constructor(private readonly postService : PostService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body:PostDto,@Headers('authorization') bearerToken: string): Promise<PostDto> {
        const token = bearerToken.split(' ')[1];
        const userId:string = await this.postService.getUserIdFromAccessToken(token);
        return await this.postService.create(body,userId);
    }


    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getAllPostBySpesificUser(@Param('id') id : string):Promise<PostDto[]>{
        return this.postService.getAllPost(id);
    }
}
