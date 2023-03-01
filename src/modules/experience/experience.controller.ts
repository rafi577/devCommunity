import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Param, Headers, Post, Put, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceDto } from './dto/experience.dto';
import { Experience } from 'src/models/experience.schema';

@Controller('experience')
export class ExperienceController {
    constructor(private readonly experienceService : ExperienceService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: ExperienceDto,@Headers('authorization') bearerToken:string):Promise<Partial<Experience>>{
        const token = bearerToken.split(' ')[1];
        const id = await this.experienceService.getUserIdFromAccessToken(token);
        return this.experienceService.create(body,id);
    }


    //update with experience id
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: string, @Body() body: ExperienceDto):Promise<ExperienceDto> {
        return await this.experienceService.update(+id, body);
    }
}
