"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPostsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const travel_post_schema_1 = require("./schemas/travel-post.schema");
const travel_posts_controller_1 = require("./travel-posts.controller");
const travel_posts_service_1 = require("./travel-posts.service");
let TravelPostsModule = class TravelPostsModule {
};
exports.TravelPostsModule = TravelPostsModule;
exports.TravelPostsModule = TravelPostsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: travel_post_schema_1.TravelPost.name, schema: travel_post_schema_1.TravelPostSchema }])],
        controllers: [travel_posts_controller_1.TravelPostsController],
        providers: [travel_posts_service_1.TravelPostsService],
        exports: [travel_posts_service_1.TravelPostsService]
    })
], TravelPostsModule);
//# sourceMappingURL=travel-posts.module.js.map