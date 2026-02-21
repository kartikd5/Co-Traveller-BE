import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProfileDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: { type: string; identifier: string; name: string }): Promise<UserDocument> {
    const { type, identifier, name } = data;
    const payload: any = { name, isVerified: true };
    if (type === 'email') payload.email = identifier;
    if (type === 'phone') payload.phone = identifier;
    
    return this.userModel.create(payload);
  }

  async findByIdentifier(type: string, identifier: string): Promise<UserDocument | null> {
    const query = type === 'email' ? { email: identifier } : { phone: identifier };
    return this.userModel.findOne(query).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async updateLastActive(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { lastActiveAt: new Date() }).exec();
  }

  async getProfile(id: string): Promise<User> {
    const user = await this.userModel.findById(id).lean().exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateProfile(id: string, updateData: UpdateProfileDto): Promise<User> {
    const { longitude, latitude, ...rest } = updateData;
    const updatePayload: any = { ...rest };

    if (longitude !== undefined && latitude !== undefined) {
      updatePayload.geo = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, updatePayload, { new: true }).lean().exec();
    if (!updatedUser) {
        throw new NotFoundException('User not found');
    }
    return updatedUser;
  }
}
