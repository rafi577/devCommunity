import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, Headers, ConflictException, Get, Param, Patch, UseGuards, Put } from '@nestjs/common';
import { SkillDto } from './dto/skill.dto';
import { SkillService } from './skill.service';
import { User } from 'src/decorators/user.decorator';
import { UpdateSkillDto } from './dto/updateSkill.dto';

@Controller('skill')
export class SkillController {
    constructor(private readonly skillService: SkillService){}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body:SkillDto,@User() user ):Promise<SkillDto>{
        return this.skillService.create(body,user._id);
    }




    //get all skill for a specific developer
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getSkill(@Param('id') id:string):Promise<SkillDto[]>{
        return await this.skillService.getSkill(id);
    }



    //update with skill id
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async updateSkill(@Body() body:UpdateSkillDto,@Param('id') id : string):Promise<UpdateSkillDto>{
        return this.skillService.updateSkill(body,id);
    }
}
