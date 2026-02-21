"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const travel_post_schema_1 = require("./schemas/travel-post.schema");
let TravelPostsService = class TravelPostsService {
    travelPostModel;
    constructor(travelPostModel) {
        this.travelPostModel = travelPostModel;
    }
    async create(userId, createDto) {
        const { longitude, latitude, ...rest } = createDto;
        const postData = { ...rest, userId: new mongoose_2.Types.ObjectId(userId) };
        if (longitude !== undefined && latitude !== undefined) {
            postData.geo = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        }
        return this.travelPostModel.create(postData);
    }
    async findAllPublic(query) {
        return this.travelPostModel
            .find({
            ...query,
            expiresAt: { $gt: new Date() }
        })
            .populate('userId', 'name profileImage age gender whatsappEnabled')
            .lean()
            .exec();
    }
    async findOne(id) {
        const post = await this.travelPostModel
            .findById(id)
            .populate('userId', 'name profileImage age gender whatsappEnabled')
            .lean()
            .exec();
        if (!post)
            throw new common_1.NotFoundException('Travel post not found');
        return post;
    }
    async findByUserId(userId) {
        return this.travelPostModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .lean()
            .exec();
    }
    async delete(id, userId) {
        const post = await this.travelPostModel.findById(id).exec();
        if (!post)
            throw new common_1.NotFoundException('Travel post not found');
        if (post.userId.toString() !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own posts');
        }
        await this.travelPostModel.findByIdAndDelete(id).exec();
        return { message: 'Post deleted successfully' };
    }
};
exports.TravelPostsService = TravelPostsService;
exports.TravelPostsService = TravelPostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(travel_post_schema_1.TravelPost.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TravelPostsService);
//# sourceMappingURL=travel-posts.service.js.map