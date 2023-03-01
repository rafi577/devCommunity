import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SkillModule } from './modules/skill/skill.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { CommentModule } from './modules/comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './modules/post/post.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URL,{dbName : 'DEV_COMMUNITY'}), //todo: take it to env,
        AuthModule, 
        SkillModule, 
        ExperienceModule, 
        CommentModule, PostModule,
    ],

})
export class AppModule {}
