import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({timestamps:true})//
export class Comment {
    @Prop({required: true})
    comment: string;
  
    @Prop({required: true})
    postId : string;
    
    @Prop({required: true})
    devId : string;
    
}

export const CommentSchema = SchemaFactory.createForClass(Comment);