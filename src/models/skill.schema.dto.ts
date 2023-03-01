import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { level } from 'src/modules/skill/dto/skill.dto';

export type SkillDocument = HydratedDocument<Skill>;

@Schema({timestamps:true})//
export class Skill {

    @Prop({required: true,unique: true})
    name : string;

    @Prop({required: true})
    level: level;

    @Prop({required: true})
    devId : string;
}



export const SkillSchema = SchemaFactory.createForClass(Skill);
