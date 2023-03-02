import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/Coment.dto';
import { User } from 'src/decorators/user.decorator';
import { UserDto } from 'src/decorators/dto/user.decorator.dto';
import { Comment } from 'src/models/comment.schema';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService:CommentService){}



    @Post(':id')//post id
    @UseGuards(AuthGuard('jwt'))
    async createCommnet(@Body() body : CommentDto,@User() user:UserDto, @Param('id') postId:string):Promise<Comment>{
        return this.commentService.createComment(body,user._id,postId);
    }
}
