import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Param, Headers, Post, Put, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceDto } from './dto/experience.dto';
import { Experience } from 'src/models/experience.schema';
import { User } from 'src/decorators/user.decorator';

@Controller('experience')
export class ExperienceController {
    constructor(private readonly experienceService : ExperienceService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: ExperienceDto,@User() user):Promise<Partial<Experience>>{
        return this.experienceService.create(body,user._id);
    }


    //update with experience id
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: string, @Body() body: ExperienceDto):Promise<ExperienceDto> {
        return await this.experienceService.update(+id, body);
    }
}
