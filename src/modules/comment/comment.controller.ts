import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/Coment.dto';
import { User } from 'src/decorators/user.decorator';


@Controller('comment')
export class CommentController {
    constructor(private readonly commentService:CommentService){}

    @Post(':id')
    @UseGuards(AuthGuard('jwt'))
    async createCommnet(@Body() body : CommentDto,@User() dev, @Param('id') postId:string):Promise<CommentDto>{
        return this.commentService.createComment(body,dev._id,postId);
    }
}
