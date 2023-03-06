import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, Headers, ConflictException, Get, Param, Patch, UseGuards, Put } from '@nestjs/common';
import { SkillDto } from './dto/skill.dto';
import { SkillService } from './skill.service';
import { User } from 'src/decorators/user.decorator';
import { UpdateSkillDto } from './dto/updateSkill.dto';
import { Skill } from 'src/models/skill.schema.dto';
import { UserDto } from 'src/decorators/dto/user.decorator.dto';

@Controller('skill')
export class SkillController {
    constructor(private readonly skillService: SkillService){}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body:SkillDto,@User() user:UserDto ):Promise<Skill>{
        return this.skillService.create(body,user._id);
    }


    //get all skill for a specific developer
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAllSkillByUser(@User() dev:UserDto):Promise<SkillDto[]>{
        return await this.skillService.getAllSkillByUser(dev._id);
    }


    //update skill with skills id
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async updateSkill(@Body() body:UpdateSkillDto,@Param('id') skillId : string):Promise<UpdateSkillDto>{
        return this.skillService.updateSkill(body,skillId);
    }
}
