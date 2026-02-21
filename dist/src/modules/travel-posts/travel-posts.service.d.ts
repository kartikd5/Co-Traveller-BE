import { Model } from 'mongoose';
import { CreateTravelPostDto } from './dto/travel-post.dto';
import { TravelPost, TravelPostDocument } from './schemas/travel-post.schema';
export declare class TravelPostsService {
    private travelPostModel;
    constructor(travelPostModel: Model<TravelPostDocument>);
    create(userId: string, createDto: CreateTravelPostDto): Promise<TravelPost>;
    findAllPublic(query: any): Promise<TravelPost[]>;
    findOne(id: string): Promise<TravelPost>;
    findByUserId(userId: string): Promise<TravelPost[]>;
    delete(id: string, userId: string): Promise<{
        message: string;
    }>;
}
