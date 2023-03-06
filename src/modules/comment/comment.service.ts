import { Injectable, Post } from '@nestjs/common';
import { CommentDto } from './dto/Coment.dto';
import { CommentDocument,Comment } from 'src/models/comment.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ExceptionsHelper } from 'src/helpers/Exceptions.helper';
import { PostDocument, post } from 'src/models/post.schema';

@Injectable()
export class CommentService {

    constructor(
        @InjectModel(Comment.name)private readonly commentModel:Model<CommentDocument>,
        @InjectModel(post.name)private readonly postModel:Model<PostDocument>
        ){}

    async createComment(body : CommentDto,devId:string,postId:string):Promise<Comment> {
        const commentData = {
            comment: body.comment,
            devId,
            postId,
        }
        
        const comment = await this.commentModel.create(commentData);
        if(comment){
            return comment;
        }
        else {
            ExceptionsHelper.dataNotSaved('Unable to create comment, data');
        }
        
    }

    async getPostWithComments(postId: string): Promise<{post : Partial<post>, comments:Partial<Comment>[]}>{
        const isValidPost = this.isValidObjectId(postId);
        console.log(isValidPost);
        if (!isValidPost) {
            ExceptionsHelper.NotFoundErrorHandler("post")
        }
        const post = await this.postModel.findById(postId).exec();
        const comments = await this.commentModel
        .aggregate([
            { 
                $match: { postId: postId } 
            },
            { $unwind: '$postId' },
            {
                $project: {
                    _id:0,
                    comment: 1,
                    createdAt: 1,
                },
             },
            
        ]).exec();
        return { ...post.toObject(), comments };
      }


      public isValidObjectId(id: string): boolean {
        if (Types.ObjectId.isValid(id)) {
          if (String(new Types.ObjectId(id)) === id) {
            return true;
          }
          return false;
        }
        return false;
      }
    
}











// async getPostWithComments(postId: string): Promise<any> {
//     const post = await this.postModel.findById(postId).exec();

//     if (!post) {
//         ExceptionsHelper.NotFoundErrorHandler("post")
//     }

//     const comments = await this.commentModel
//       .aggregate([
//         { $match: { postId: post._id } },
//         // {
//         //   $lookup: {
//         //     from: 'posts', // name of the users collection
//         //     localField: 'postId',
//         //     foreignField: '_id',
//         //     as: 'post',
//         //   },
//         // },
//         // { $unwind: '$post' },
//         // {
//         //   $project: {
//         //     _id: 1,
//         //     body: 1,
//         //     createdAt: 1,
//         //     'user.username': 1,
//         //     'user.email': 1,
//         //   },
//         // },
//       ])
//       .exec();

//     return { ...post.toObject(), comments };
//   }