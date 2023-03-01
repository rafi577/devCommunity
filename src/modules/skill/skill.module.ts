import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from 'src/models/skill.schema.dto';

@Module({
  imports: [MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }])],
  controllers: [SkillController],
  providers: [SkillService]
})
export class SkillModule {}
