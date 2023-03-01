import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeveloperDocument = HydratedDocument<Developer>;

@Schema({timestamps: true})//
export class Developer {
    @Prop({required: true})
    phone: string;


    @Prop({
        type: String,
        required: true,
    })
    fname : string;


    @Prop({type: String,
        required: true,
        })
    lname : string;


    @Prop({
        type:String,
        required:true,
        unique:true
    })
    email:string;



    @Prop({
        required: true,
        //select: false
    })
    password: string;
        
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);