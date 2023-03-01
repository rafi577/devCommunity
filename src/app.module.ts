import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SkillModule } from './modules/skill/skill.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://tanvir:tanvir@cluster0.r2x6tgi.mongodb.net/?retryWrites=true&w=majority',{dbName : 'DEV_COMMUNITY'}), //todo: take it to env,
        AuthModule, 
        SkillModule, 
        ExperienceModule, 
        PostModule, 
        CommentModule,
    ],

})
export class AppModule {}
