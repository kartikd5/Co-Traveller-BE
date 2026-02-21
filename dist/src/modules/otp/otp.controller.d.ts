import { SendOtpDto } from './dto/otp.dto';
import { OtpService } from './otp.service';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    sendOtp(sendOtpDto: SendOtpDto): Promise<{
        message: string;
    }>;
}
