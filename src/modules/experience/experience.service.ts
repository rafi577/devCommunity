import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience, ExperienceDocument } from 'src/models/experience.schema';
import { ExperienceDto } from './dto/experience.dto';
import * as jwt from 'jsonwebtoken'
import { ExceptionsHelper } from 'src/helpers/Exceptions.helper';

@Injectable()
export class ExperienceService {
    constructor(@InjectModel(Experience.name) private readonly experienceModel:Model<ExperienceDocument>){}



    async create(body : ExperienceDto,id:string):Promise<Partial<Experience>> {
        const {title,start_time,end_time, description} = body;
        const data = {
            title,
            start_time,
            end_time,
            description,
            devId : id
        }
        
        const experienceData =await this.experienceModel.create(data);
        
        if(experienceData)return experienceData.save();
        else ExceptionsHelper.dataNotSaved('experience data');
        
        
    }

    async update(id:number,body : ExperienceDto):Promise<ExperienceDto> {
        const {title,start_time,end_time, description} = body;
        const data = {
            title,
            start_time,
            end_time,
            description
        }
        
        const experienceData = await this.experienceModel.findOneAndUpdate({ _id: id }, data, { new: true });
        if(experienceData)return experienceData.toObject();
        else ExceptionsHelper.dataNotSaved('Unable to update experience, data');
        
    }
}
