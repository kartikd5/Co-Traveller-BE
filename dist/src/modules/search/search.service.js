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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const travel_post_schema_1 = require("../travel-posts/schemas/travel-post.schema");
let SearchService = class SearchService {
    travelPostModel;
    constructor(travelPostModel) {
        this.travelPostModel = travelPostModel;
    }
    async searchPosts(queryDto) {
        const { country, city, area, date, transportPreference, gender, page, limit, sort, } = queryDto;
        const filter = {
            expiresAt: { $gt: new Date() },
        };
        if (country)
            filter.country = new RegExp(country, 'i');
        if (city)
            filter.city = new RegExp(city, 'i');
        if (area)
            filter.area = new RegExp(area, 'i');
        if (transportPreference)
            filter.transportPreference = transportPreference;
        if (gender)
            filter.preferredGender = gender;
        if (date) {
            const searchDate = new Date(date);
            const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));
            filter.fromDate = { $gte: startOfDay, $lte: endOfDay };
        }
        const parsedPage = page || 1;
        const parsedLimit = limit || 10;
        const skip = (parsedPage - 1) * parsedLimit;
        const [items, total] = await Promise.all([
            this.travelPostModel
                .find(filter)
                .sort(sort || '-createdAt')
                .skip(skip)
                .limit(parsedLimit)
                .populate('userId', 'name profileImage gender age')
                .lean()
                .exec(),
            this.travelPostModel.countDocuments(filter).exec(),
        ]);
        return {
            items,
            meta: {
                total,
                page: parsedPage,
                limit: parsedLimit,
                totalPages: Math.ceil(total / parsedLimit),
            },
        };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(travel_post_schema_1.TravelPost.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SearchService);
//# sourceMappingURL=search.service.js.map