import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    TravelPost,
    TravelPostDocument,
} from '../travel-posts/schemas/travel-post.schema';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(TravelPost.name)
    private travelPostModel: Model<TravelPostDocument>,
  ) {}

  async searchPosts(queryDto: SearchQueryDto) {
    const {
      fromCountry,
      fromCity,
      fromArea,
      toCountry,
      toCity,
      toArea,
      date,
      transportPreference,
      gender,
      page,
      limit,
      sort,
    } = queryDto;

    const filter: any = {
      expiresAt: { $gt: new Date() }, // Only active posts
    };

    if (fromCountry) filter.fromCountry = new RegExp(fromCountry, 'i');
    if (fromCity) filter.fromCity = new RegExp(fromCity, 'i');
    if (fromArea) filter.fromArea = new RegExp(fromArea, 'i');
    if (toCountry) filter.toCountry = new RegExp(toCountry, 'i');
    if (toCity) filter.toCity = new RegExp(toCity, 'i');
    if (toArea) filter.toArea = new RegExp(toArea, 'i');
    if (transportPreference) filter.transportPreference = transportPreference;
    if (gender) filter.preferredGender = gender;

    // Date filtering: Match the exact travel date if provided
    if (date) {
      const searchDate = new Date(date);
      const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));
      filter.travelDate = { $gte: startOfDay, $lte: endOfDay };
    }

    const parsedPage = page || 1;
    const parsedLimit = limit || 10;
    const skip = (parsedPage - 1) * parsedLimit;

    const [items, total] = await Promise.all([
      this.travelPostModel
        .find(filter)
        .sort(sort || '-createdAt')
        .skip(skip)
        .limit(parsedLimit)
        .populate('userId', 'name profileImage gender age') // Avoid returning emails/phones
        .lean()
        .exec(),
      this.travelPostModel.countDocuments(filter).exec(),
    ]);

    return {
      items,
      meta: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },
    };
  }
}
