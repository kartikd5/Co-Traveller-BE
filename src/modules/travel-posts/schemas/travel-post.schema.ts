import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TravelPostDocument = TravelPost & Document;

@Schema({ timestamps: true })
export class TravelPost {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  fromCountry: string;

  @Prop({ required: true })
  fromCity: string;

  @Prop()
  fromArea?: string;

  @Prop({
    type: { type: String, enum: ['Point'] },
    coordinates: { type: [Number] },
  })
  fromGeo?: { type: string; coordinates: number[] };

  @Prop({ required: true })
  toCountry: string;

  @Prop({ required: true })
  toCity: string;

  @Prop()
  toArea?: string;

  @Prop({
    type: { type: String, enum: ['Point'] },
    coordinates: { type: [Number] },
  })
  toGeo?: { type: string; coordinates: number[] };

  @Prop({ required: true, enum: ['car', 'bus', 'train', 'flight'] })
  transportPreference: string;

  @Prop()
  preferredGender?: string;

  @Prop({ required: true })
  travelDate: Date;

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
TravelPostSchema.index({ fromCountry: 1 });
TravelPostSchema.index({ fromCity: 1 });
TravelPostSchema.index({ toCountry: 1 });
TravelPostSchema.index({ toCity: 1 });
TravelPostSchema.index({ travelDate: 1 });
TravelPostSchema.index({ transportPreference: 1 });
TravelPostSchema.index({ preferredGender: 1 });
// Compound index
TravelPostSchema.index({ fromCity: 1, toCity: 1, travelDate: 1 });
// TTL index for auto-deletion
TravelPostSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Pre save hook to ensure expiresAt is correctly set (e.g. End of 'travelDate') before validation
TravelPostSchema.pre('validate', function () {
  if (this.isModified('travelDate') || this.isNew) {
    // Set expiry to 24 hours after the travel date starts
    const expiry = new Date(this.travelDate);
    expiry.setHours(expiry.getHours() + 24);
    this.expiresAt = expiry;
  }
});
