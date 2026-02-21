import { Model } from 'mongoose';
import { TravelPost, TravelPostDocument } from '../travel-posts/schemas/travel-post.schema';
import { SearchQueryDto } from './dto/search-query.dto';
export declare class SearchService {
    private travelPostModel;
    constructor(travelPostModel: Model<TravelPostDocument>);
    searchPosts(queryDto: SearchQueryDto): Promise<{
        items: (TravelPost & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
