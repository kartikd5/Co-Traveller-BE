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
exports.TravelPostsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const travel_post_dto_1 = require("./dto/travel-post.dto");
const travel_posts_service_1 = require("./travel-posts.service");
let TravelPostsController = class TravelPostsController {
    travelPostsService;
    constructor(travelPostsService) {
        this.travelPostsService = travelPostsService;
    }
    async getAll() {
        return this.travelPostsService.findAllPublic({});
    }
    async getOne(id) {
        return this.travelPostsService.findOne(id);
    }
    async create(req, createDto) {
        return this.travelPostsService.create(req.user.userId, createDto);
    }
    async getMyPosts(req) {
        return this.travelPostsService.findByUserId(req.user.userId);
    }
    async delete(req, id) {
        return this.travelPostsService.delete(id, req.user.userId);
    }
};
exports.TravelPostsController = TravelPostsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all public active travel posts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TravelPostsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get details of a specific post' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TravelPostsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new One-Way travel post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post created successfully' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, travel_post_dto_1.CreateTravelPostDto]),
    __metadata("design:returntype", Promise)
], TravelPostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('user/me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get login user posts' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TravelPostsController.prototype, "getMyPosts", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete own travel post' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TravelPostsController.prototype, "delete", null);
exports.TravelPostsController = TravelPostsController = __decorate([
    (0, swagger_1.ApiTags)('Travel Posts'),
    (0, common_1.Controller)('travel-posts'),
    __metadata("design:paramtypes", [travel_posts_service_1.TravelPostsService])
], TravelPostsController);
//# sourceMappingURL=travel-posts.controller.js.map