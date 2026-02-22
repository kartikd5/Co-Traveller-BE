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
exports.CreateTravelPostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTravelPostDto {
    fromCountry;
    fromCity;
    fromArea;
    fromLongitude;
    fromLatitude;
    toCountry;
    toCity;
    toArea;
    toLongitude;
    toLatitude;
    transportPreference;
    preferredGender;
    travelDate;
    timeRangeStart;
    timeRangeEnd;
    interests;
    reason;
}
exports.CreateTravelPostDto = CreateTravelPostDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "fromCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "fromCity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "fromArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Longitude' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTravelPostDto.prototype, "fromLongitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Latitude' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTravelPostDto.prototype, "fromLatitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "toCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "toCity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "toArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Longitude' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTravelPostDto.prototype, "toLongitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Latitude' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTravelPostDto.prototype, "toLatitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['car', 'bus', 'train', 'flight'] }),
    (0, class_validator_1.IsEnum)(['car', 'bus', 'train', 'flight']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "transportPreference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "preferredGender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ISO string of the date of travel' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "travelDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Time in HH:mm format' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "timeRangeStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Time in HH:mm format' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "timeRangeEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateTravelPostDto.prototype, "interests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reason for travel/searching for a companion' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTravelPostDto.prototype, "reason", void 0);
//# sourceMappingURL=travel-post.dto.js.map