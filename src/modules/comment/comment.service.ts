import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/Coment.dto';
import { CommentDocument,Comment } from 'src/models/comment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ExceptionsHelper } from 'src/helpers/Exceptions.helper';

@Injectable()
export class CommentService {

    constructor(@InjectModel(Comment.name)private readonly commentModel:Model<CommentDocument>){}

    async createComment(body : CommentDto,devId:string,postId:string):Promise<Comment> {
        const commentData = {
            comment: body.comment,
            devId,
            postId,
        }
        
        const comment = await this.commentModel.create(commentData);
        if(comment)return comment;
        else ExceptionsHelper.dataNotSaved('Unable to create comment, data');
        
    }
}
