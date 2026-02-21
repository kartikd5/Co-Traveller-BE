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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPostSchema = exports.TravelPost = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TravelPost = class TravelPost {
    userId;
    fromLocation;
    toLocation;
    country;
    city;
    area;
    geo;
    transportPreference;
    preferredGender;
    fromDate;
    timeRangeStart;
    timeRangeEnd;
    interests;
    reason;
    expiresAt;
};
exports.TravelPost = TravelPost;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TravelPost.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TravelPost.prototype, "fromLocation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TravelPost.prototype, "toLocation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TravelPost.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TravelPost.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TravelPost.prototype, "area", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
        },
    }),
    __metadata("design:type", Object)
], TravelPost.prototype, "geo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['car', 'bus', 'train', 'flight'] }),
    __metadata("design:type", String)
], TravelPost.prototype, "transportPreference", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TravelPost.prototype, "preferredGender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], TravelPost.prototype, "fromDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TravelPost.prototype, "timeRangeStart", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TravelPost.prototype, "timeRangeEnd", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], TravelPost.prototype, "interests", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TravelPost.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], TravelPost.prototype, "expiresAt", void 0);
exports.TravelPost = TravelPost = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TravelPost);
exports.TravelPostSchema = mongoose_1.SchemaFactory.createForClass(TravelPost);
exports.TravelPostSchema.index({ toLocation: 1 });
exports.TravelPostSchema.index({ country: 1 });
exports.TravelPostSchema.index({ city: 1 });
exports.TravelPostSchema.index({ fromDate: 1 });
exports.TravelPostSchema.index({ transportPreference: 1 });
exports.TravelPostSchema.index({ preferredGender: 1 });
exports.TravelPostSchema.index({ city: 1, fromDate: 1 });
exports.TravelPostSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
exports.TravelPostSchema.pre('save', function (next) {
    if (this.isModified('fromDate') || this.isNew) {
        const expiry = new Date(this.fromDate);
        expiry.setHours(expiry.getHours() + 24);
        this.expiresAt = expiry;
    }
    next();
});
//# sourceMappingURL=travel-post.schema.js.map