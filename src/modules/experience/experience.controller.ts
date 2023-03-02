import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Param, Headers, Post, Put, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceDto } from './dto/experience.dto';
import { Experience } from 'src/models/experience.schema';
import { User } from 'src/decorators/user.decorator';
import { UserDto } from 'src/decorators/dto/user.decorator.dto';

@Controller('experience')
export class ExperienceController {
    constructor(private readonly experienceService : ExperienceService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: ExperienceDto,@User() user:UserDto):Promise<Partial<Experience>>{
        return this.experienceService.create(body,user._id);
    }


    //update experience with experiences id
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: string, @Body() body: ExperienceDto):Promise<ExperienceDto> {
        return await this.experienceService.update(+id, body);
    }
}
