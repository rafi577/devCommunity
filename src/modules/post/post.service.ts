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
        try{
            const postData = await this.createPostModel.create(data);
            return postData.save();
        }
        catch(err){
            ExceptionsHelper.dataNotSaved(err);
        }
        
    }
    async getAllPost(id:string):Promise<PostDto[]>{
        try{
            const post =await this.createPostModel.find({id});
            if(post){
                return post;
            }
        }
        catch(err){
            ExceptionsHelper.NotFoundErrorHandler(err,'data')
        }
    }


    
}