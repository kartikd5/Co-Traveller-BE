export declare class CreateTravelPostDto {
    fromLocation: string;
    toLocation: string;
    country: string;
    city: string;
    area?: string;
    longitude?: number;
    latitude?: number;
    transportPreference: string;
    preferredGender?: string;
    fromDate: string;
    timeRangeStart?: string;
    timeRangeEnd?: string;
    interests: string[];
    reason: string;
}
