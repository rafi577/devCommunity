import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { post, PostSchema } from 'src/models/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: post.name, schema: PostSchema }])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
