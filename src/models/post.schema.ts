import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<post>;

@Schema({timestamps: true})//
export class post {

    @Prop({required : true})
    devId:string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description : string;

}

export const PostSchema = SchemaFactory.createForClass(post);