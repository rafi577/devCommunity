import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/Coment.dto';
import { User } from 'src/decorators/user.decorator';
import { UserDto } from 'src/decorators/dto/user.decorator.dto';
import { Comment } from 'src/models/comment.schema';
import { post } from 'src/models/post.schema';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService:CommentService){}



    @Post(':id')//post id
    @UseGuards(AuthGuard('jwt'))
    async createCommnet(@Body() body : CommentDto,@User() dev:UserDto, @Param('id') postId:string):Promise<Comment>{
        return this.commentService.createComment(body,dev._id,postId);
    }

    @Get(':id')
    async getPostWithComments(@Param('id') postId:string):Promise<{post : Partial<post>, comments:Partial<Comment>[]}>{
        return this.commentService.getPostWithComments(postId);
    }
}
