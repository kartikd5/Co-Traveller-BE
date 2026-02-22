import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { SendOtpDto } from './dto/otp.dto';
import { Otp, OtpDocument } from './schemas/otp.schema';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  private transporter: nodemailer.Transporter;

  constructor(@InjectModel(Otp.name) private otpModel: Model<OtpDocument>) {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

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
      {
        type,
        identifier,
        otpHash,
      },
      { upsert: true, new: true },
    );

    if (type === 'email') {
      try {
        await this.transporter.sendMail({
          from: `"Co-Traveller" <${process.env.EMAIL_USER}>`,
          to: identifier,
          subject: 'Your Co-Traveller Verification OTP',
          text: `Your OTP is: ${otp}`,
          html: `<p>Your Co-Traveller verification OTP is: <b>${otp}</b></p><p>This OTP will expire in 5 minutes.</p>`,
        });
        this.logger.debug(`[Email Sent] OTP to ${identifier}`);
      } catch (error) {
        this.logger.error(`Error sending email to ${identifier}:`, error);
      }
    } else {
      // Simulate for phone/SMS
      this.logger.debug(`[SMS Simulation] OTP for ${identifier}: ${otp}`);
    }

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(
    type: string,
    identifier: string,
    otp: string,
  ): Promise<boolean> {
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
