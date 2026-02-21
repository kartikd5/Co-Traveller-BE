import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TravelPostDocument = TravelPost & Document;

@Schema({ timestamps: true })
export class TravelPost {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  fromLocation: string;

  @Prop({ required: true })
  toLocation: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

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

  @Prop({ required: true, enum: ['car', 'bus', 'train', 'flight'] })
  transportPreference: string;

  @Prop()
  preferredGender?: string;

  @Prop({ required: true })
  fromDate: Date;

  @Prop()
  timeRangeStart?: string;

  @Prop()
  timeRangeEnd?: string;

  @Prop({ type: [String] })
  interests: string[];

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  expiresAt: Date;
}

export const TravelPostSchema = SchemaFactory.createForClass(TravelPost);

// Required Indexes
TravelPostSchema.index({ toLocation: 1 });
TravelPostSchema.index({ country: 1 });
TravelPostSchema.index({ city: 1 });
TravelPostSchema.index({ fromDate: 1 });
TravelPostSchema.index({ transportPreference: 1 });
TravelPostSchema.index({ preferredGender: 1 });
// Compound index
TravelPostSchema.index({ city: 1, fromDate: 1 });
// TTL index for auto-deletion
TravelPostSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Pre save hook to ensure expiresAt is correctly set (e.g. End of 'fromDate')
TravelPostSchema.pre('save', function (next: any) {
  if (this.isModified('fromDate') || this.isNew) {
    // Set expiry to 24 hours after the travel date starts
    const expiry = new Date(this.fromDate);
    expiry.setHours(expiry.getHours() + 24);
    this.expiresAt = expiry;
  }
  next();
});
