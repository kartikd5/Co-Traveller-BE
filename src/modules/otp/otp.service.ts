import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { SendOtpDto } from './dto/otp.dto';
import { Otp, OtpDocument } from './schemas/otp.schema';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(@InjectModel(Otp.name) private otpModel: Model<OtpDocument>) {}

  async sendOtp(sendOtpDto: SendOtpDto): Promise<{ message: string }> {
    const { type, identifier } = sendOtpDto;

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Hash OTP before saving
    const saltRounds = 10;
    const otpHash = await bcrypt.hash(otp, saltRounds);

    // Save to DB (upsert so we don't spam multiple records for same identifier)
    await this.otpModel.findOneAndUpdate(
      { type, identifier },
      { type, identifier, otpHash, expiresAt: new Date(Date.now() + 5 * 60 * 1000) },
      { upsert: true, new: true }
    );

    // Simulate sending OTP (In real world: integrate SendGrid/Twilio here)
    this.logger.debug(`[Simulation] OTP for ${identifier}: ${otp}`);

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(type: string, identifier: string, otp: string): Promise<boolean> {
    const otpRecord = await this.otpModel.findOne({ type, identifier });
    
    if (!otpRecord) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const isValid = await bcrypt.compare(otp, otpRecord.otpHash);
    
    if (!isValid) {
      throw new BadRequestException('Incorrect OTP');
    }

    // OTP verified successfully, remove it so it cannot be reused
    await this.otpModel.deleteOne({ _id: otpRecord._id });
    
    return true;
  }
}
