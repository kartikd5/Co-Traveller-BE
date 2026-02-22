import { Model } from 'mongoose';
import { SendOtpDto } from './dto/otp.dto';
import { OtpDocument } from './schemas/otp.schema';
export declare class OtpService {
    private otpModel;
    private readonly logger;
    private transporter;
    constructor(otpModel: Model<OtpDocument>);
    sendOtp(sendOtpDto: SendOtpDto): Promise<{
        message: string;
    }>;
    verifyOtp(type: string, identifier: string, otp: string): Promise<boolean>;
}
