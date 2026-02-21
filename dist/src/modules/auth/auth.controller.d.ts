import { VerifyOtpDto } from '../otp/dto/otp.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
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
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
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
}
