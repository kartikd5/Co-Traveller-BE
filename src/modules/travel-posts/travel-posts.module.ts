import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelPost, TravelPostSchema } from './schemas/travel-post.schema';
import { TravelPostsController } from './travel-posts.controller';
import { TravelPostsService } from './travel-posts.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TravelPost.name, schema: TravelPostSchema }])],
  controllers: [TravelPostsController],
  providers: [TravelPostsService],
  exports: [TravelPostsService]
})
export class TravelPostsModule {}
