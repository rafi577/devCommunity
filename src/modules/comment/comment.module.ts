import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentSchema,Comment } from 'src/models/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Comment.name,schema:CommentSchema}])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
