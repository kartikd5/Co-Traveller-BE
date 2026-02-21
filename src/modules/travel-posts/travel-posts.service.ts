import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTravelPostDto } from './dto/travel-post.dto';
import { TravelPost, TravelPostDocument } from './schemas/travel-post.schema';

@Injectable()
export class TravelPostsService {
  constructor(
    @InjectModel(TravelPost.name) private travelPostModel: Model<TravelPostDocument>
  ) {}

  async create(userId: string, createDto: CreateTravelPostDto): Promise<TravelPost> {
    const { longitude, latitude, ...rest } = createDto;
    const postData: any = { ...rest, userId: new Types.ObjectId(userId) };

    if (longitude !== undefined && latitude !== undefined) {
      postData.geo = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };
    }

    return this.travelPostModel.create(postData);
  }

  async findAllPublic(query: any): Promise<TravelPost[]> {
    // Only fetch valid, non-expired posts using lean()
    return this.travelPostModel
      .find({
        ...query,
        expiresAt: { $gt: new Date() } 
      })
      .populate('userId', 'name profileImage age gender whatsappEnabled')
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<TravelPost> {
    const post = await this.travelPostModel
      .findById(id)
      .populate('userId', 'name profileImage age gender whatsappEnabled')
      .lean()
      .exec();

    if (!post) throw new NotFoundException('Travel post not found');
    return post;
  }

  async findByUserId(userId: string): Promise<TravelPost[]> {
    return this.travelPostModel
      .find({ userId: new Types.ObjectId(userId) })
      .lean()
      .exec();
  }

  async delete(id: string, userId: string): Promise<{ message: string }> {
    const post = await this.travelPostModel.findById(id).exec();
    if (!post) throw new NotFoundException('Travel post not found');
    
    if (post.userId.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    await this.travelPostModel.findByIdAndDelete(id).exec();
    return { message: 'Post deleted successfully' };
  }
}
