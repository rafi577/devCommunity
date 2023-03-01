import { ConflictException, Injectable } from '@nestjs/common';
import { SkillDto } from './dto/skill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Skill, SkillDocument } from 'src/models/skill.schema.dto';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken'
import { ExceptionsHelper } from 'src/helpers/Exceptions.helper';
import { UpdateSkillDto } from './dto/updateSkill.dto';

@Injectable()
export class SkillService {
    constructor(@InjectModel(Skill.name) private skillModel: Model<SkillDocument>){}

    async create(body : SkillDto,id:string): Promise<SkillDto> {
        try{
            const {name,level} = body;
            const data = {
                name,
                level,
                devId:id
            }
            // await this.skillModel.createIndexes();
            const skillData = await this.skillModel.create(data);
            return skillData.save();
        }
        catch (err) {
            ExceptionsHelper.DuplicateException(err,'Skill');
        }
    }

    async getSkill(id:string):Promise<SkillDto[]>{
        try{
            const data = await this.skillModel.find({id});
            if(data)return data;
        }
        catch(err){
            ExceptionsHelper.NotFoundErrorHandler(err,'Skills');
        }
    }

    async updateSkill(body:UpdateSkillDto,id:string):Promise<UpdateSkillDto>{
        const data = {
            level:body.level,
        }
        try{
            const  updateSkillData = await this.skillModel.updateOne({id},data);
            return data;
        }
        catch(err){
            ExceptionsHelper.dataNotSaved(err);
        }
    }

}
