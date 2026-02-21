import { CreateTravelPostDto } from './dto/travel-post.dto';
import { TravelPostsService } from './travel-posts.service';
export declare class TravelPostsController {
    private readonly travelPostsService;
    constructor(travelPostsService: TravelPostsService);
    getAll(): Promise<import("./schemas/travel-post.schema").TravelPost[]>;
    getOne(id: string): Promise<import("./schemas/travel-post.schema").TravelPost>;
    create(req: any, createDto: CreateTravelPostDto): Promise<import("./schemas/travel-post.schema").TravelPost>;
    getMyPosts(req: any): Promise<import("./schemas/travel-post.schema").TravelPost[]>;
    delete(req: any, id: string): Promise<{
        message: string;
    }>;
}
