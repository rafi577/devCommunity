import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as jwt from 'jsonwebtoken';
import { PostDto } from './dto/Post.dto';
import { Post, PostDocument } from 'src/models/post.schema';
import { ExceptionsHelper } from 'src/helpers/Exceptions.helper';


@Injectable()
export class PostService {

    constructor(@InjectModel(Post.name) private createPostModel: Model<PostDocument>){}

    async create(body : PostDto, id:string): Promise<PostDto> {
        const data = {
            title:body.title,
            description:body.description,
            devId : id
        }
        
        const postData = await this.createPostModel.create(data);

        if(postData){
            return postData.save();
        }
        else{
            ExceptionsHelper.dataNotSaved('post');
        }
    }


    async getAllPostByUser(id:string, user):Promise<PostDto[]>{
        
        const post =await this.createPostModel.find({devId: user._id});
        if(post){ 
            return post;
        }
        else{ 
            ExceptionsHelper.NotFoundErrorHandler('developer')
        }
    }


    
}