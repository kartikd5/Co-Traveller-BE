import {
    ForbiddenException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTravelPostDto } from './dto/travel-post.dto';
import { TravelPost, TravelPostDocument } from './schemas/travel-post.schema';

@Injectable()
export class TravelPostsService {
  private readonly logger = new Logger(TravelPostsService.name);

  constructor(
    @InjectModel(TravelPost.name)
    private travelPostModel: Model<TravelPostDocument>,
  ) {}

  async create(
    userId: string,
    createDto: CreateTravelPostDto,
  ): Promise<TravelPost> {
    try {
      const { fromLongitude, fromLatitude, toLongitude, toLatitude, ...rest } =
        createDto;
      const postData: any = { ...rest, userId: new Types.ObjectId(userId) };

      if (fromLongitude !== undefined && fromLatitude !== undefined) {
        postData.fromGeo = {
          type: 'Point',
          coordinates: [fromLongitude, fromLatitude],
        };
      }

      if (toLongitude !== undefined && toLatitude !== undefined) {
        postData.toGeo = {
          type: 'Point',
          coordinates: [toLongitude, toLatitude],
        };
      }

      return await this.travelPostModel.create(postData);
    } catch (error) {
      this.logger.error(
        `Error creating travel post for user: ${userId}. Details: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAllPublic(query: any): Promise<TravelPost[]> {
    // Only fetch valid, non-expired posts using lean()
    return this.travelPostModel
      .find({
        ...query,
        expiresAt: { $gt: new Date() },
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
