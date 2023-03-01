import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type ExperienceDocument = HydratedDocument< Experience>;

@Schema({timestamps:true})//
export class  Experience {

    @Prop({required: true})
    title : string;

    @Prop({required: true})
    start_time : string;

    @Prop({required: true})
    end_time : string;

    @Prop({required: true})
    description : string;

    @Prop({required: true})
    devId : string;
        
}



export const  ExperienceSchema = SchemaFactory.createForClass( Experience);
