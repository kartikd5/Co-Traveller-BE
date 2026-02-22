import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: true, enum: ['email', 'phone'] })
  type: string;

  @Prop({ required: true })
  identifier: string;

  @Prop({ required: true })
  otpHash: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 }); // 5 minutes TTL
