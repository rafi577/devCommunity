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
        try{
            const experienceData = this.experienceModel.create(data);
            return experienceData;
        }
        catch(err){
            ExceptionsHelper.dataNotSaved(err);
        }
    }

    async update(id:number,body : ExperienceDto):Promise<ExperienceDto> {
        const {title,start_time,end_time, description} = body;
        const data = {
            title,
            start_time,
            end_time,
            description
        }
        try{
            const experienceData = await this.experienceModel.updateOne({id},data);
            return data;
        }
        catch(err){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                message: 'data not updated',
                errorCode: 'data_not_updated',
                data: {}
              }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: err
              }); 
        }
    }
}
