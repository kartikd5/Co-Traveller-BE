import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelPost, TravelPostSchema } from '../travel-posts/schemas/travel-post.schema';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TravelPost.name, schema: TravelPostSchema }])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
