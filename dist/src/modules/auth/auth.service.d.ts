import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { VerifyOtpDto } from '../otp/dto/otp.dto';
import { OtpService } from '../otp/otp.service';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly otpService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, otpService: OtpService, jwtService: JwtService, configService: ConfigService);
    verifyOtpAndLogin(verifyOtpDto: VerifyOtpDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            _id: any;
            name: any;
            email: any;
            phone: any;
            profileImage: any;
            isVerified: any;
        };
    }>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            _id: any;
            name: any;
            email: any;
            phone: any;
            profileImage: any;
            isVerified: any;
        };
    }>;
    private generateTokens;
}
