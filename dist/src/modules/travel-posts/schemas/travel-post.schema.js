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
    fromCountry;
    fromCity;
    fromArea;
    fromGeo;
    toCountry;
    toCity;
    toArea;
    toGeo;
    transportPreference;
    preferredGender;
    travelDate;
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
], TravelPost.prototype, "fromCountry", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TravelPost.prototype, "fromCity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TravelPost.prototype, "fromArea", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: { type: String, enum: ['Point'] },
        coordinates: { type: [Number] },
    }),
    __metadata("design:type", Object)
], TravelPost.prototype, "fromGeo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TravelPost.prototype, "toCountry", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TravelPost.prototype, "toCity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TravelPost.prototype, "toArea", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: { type: String, enum: ['Point'] },
        coordinates: { type: [Number] },
    }),
    __metadata("design:type", Object)
], TravelPost.prototype, "toGeo", void 0);
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
], TravelPost.prototype, "travelDate", void 0);
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
exports.TravelPostSchema.index({ fromCountry: 1 });
exports.TravelPostSchema.index({ fromCity: 1 });
exports.TravelPostSchema.index({ toCountry: 1 });
exports.TravelPostSchema.index({ toCity: 1 });
exports.TravelPostSchema.index({ travelDate: 1 });
exports.TravelPostSchema.index({ transportPreference: 1 });
exports.TravelPostSchema.index({ preferredGender: 1 });
exports.TravelPostSchema.index({ fromCity: 1, toCity: 1, travelDate: 1 });
exports.TravelPostSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
exports.TravelPostSchema.pre('validate', function () {
    if (this.isModified('travelDate') || this.isNew) {
        const expiry = new Date(this.travelDate);
        expiry.setHours(expiry.getHours() + 24);
        this.expiresAt = expiry;
    }
});
//# sourceMappingURL=travel-post.schema.js.map