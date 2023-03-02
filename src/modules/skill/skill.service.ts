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

    async create(body : SkillDto,devId:string): Promise<Skill> {
        
        const {name,level} = body;
        const data = {
            name,
            level,
            devId
        }
        const isSkillExist = await this.skillModel.find({name:name});
        if(!isSkillExist){
            const skillData = await this.skillModel.create(data);
            return skillData.save();
        }
        else{
            let isTheSkillExistOnThisDeveloper = false;
            for(const existingSkill of isSkillExist){
                if(existingSkill.devId===devId.toString()){
                    isTheSkillExistOnThisDeveloper = true;
                    break;
                }
            }
            if(!isTheSkillExistOnThisDeveloper){
                console.log(isTheSkillExistOnThisDeveloper);
                const skillData = await this.skillModel.create(data);
                return skillData.save();
            }
            else{
                ExceptionsHelper.DuplicateException('Skill');
            }
        }        
    }

    async getAllSkillByUser(id:string):Promise<SkillDto[]>{
    
        const data = await this.skillModel.find({devId:id});
        if(data){
            return data;
        }
        else {
            ExceptionsHelper.NotFoundErrorHandler('Skills');
        }
        
    }
    async updateSkill(body:UpdateSkillDto,id:string):Promise<UpdateSkillDto>{
        const data = {
            level:body.level,
        }
    
        const  updateSkillData = await this.skillModel.findOneAndUpdate({_id:id},data,{new:true});
        if(updateSkillData) {
            return updateSkillData.toObject();
        }
        else {
            ExceptionsHelper.dataNotSaved('Unable to update, data');
        }
        
    }

}
