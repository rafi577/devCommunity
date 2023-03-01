import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { Experience, ExperienceSchema } from 'src/models/experience.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Experience.name, schema: ExperienceSchema }])
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService]
})
export class ExperienceModule {}
