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

  @Prop({
    required: true,
    type: Date,
    expires: '5m', // TTL index at 5 minutes
  })
  expiresAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
