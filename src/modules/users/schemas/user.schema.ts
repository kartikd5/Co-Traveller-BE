import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop({ unique: true, sparse: true })
  phone?: string;

  @Prop({ enum: ['male', 'female', 'other'] })
  gender?: string;

  @Prop()
  dob?: Date;

  @Prop()
  country?: string;

  @Prop()
  city?: string;

  @Prop()
  area?: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    },
  })
  geo?: {
    type: string;
    coordinates: number[];
  };

  @Prop({ default: false })
  whatsappEnabled?: boolean;

  @Prop()
  profileImage?: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: Date.now })
  lastActiveAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// 2dsphere index on geo for future geo search
UserSchema.index({ geo: '2dsphere' });
