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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const otp_service_1 = require("../otp/otp.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    usersService;
    otpService;
    jwtService;
    configService;
    constructor(usersService, otpService, jwtService, configService) {
        this.usersService = usersService;
        this.otpService = otpService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async verifyOtpAndLogin(verifyOtpDto) {
        const { type, identifier, otp, name } = verifyOtpDto;
        await this.otpService.verifyOtp(type, identifier, otp);
        let user = await this.usersService.findByIdentifier(type, identifier);
        if (!user) {
            if (!name) {
                throw new common_1.BadRequestException('Name is required for new user registration');
            }
            user = await this.usersService.createUser({ type, identifier, name });
        }
        await this.usersService.updateLastActive(user._id.toString());
        return this.generateTokens(user);
    }
    async refreshTokens(refreshToken) {
        try {
            const secret = this.configService.get('JWT_REFRESH_SECRET');
            const payload = this.jwtService.verify(refreshToken, { secret });
            const user = await this.usersService.findById(payload.sub);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            await this.usersService.updateLastActive(user._id.toString());
            return this.generateTokens(user);
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
    }
    async generateTokens(user) {
        const payload = { sub: user._id, email: user.email, phone: user.phone };
        const accessTokenOptions = {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION', '5m'),
        };
        const refreshTokenOptions = {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d'),
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, accessTokenOptions),
            this.jwtService.signAsync(payload, refreshTokenOptions),
        ]);
        const userToReturn = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            profileImage: user.profileImage,
            isVerified: user.isVerified,
        };
        return {
            accessToken,
            refreshToken,
            user: userToReturn,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        otp_service_1.OtpService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map